// Setup default environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`Electron launching with NODE_ENV: ${process.env.NODE_ENV}`);


// Import dependencies
import { app, BrowserWindow, ipcMain, ipcRenderer, Menu, shell, dialog, session } from 'electron';
import contextMenu = require('electron-context-menu');
import storage = require('electron-json-storage');
import readline = require('readline');
import ytdl = require('ytdl-core');
import ffmpeg = require('fluent-ffmpeg');
import path = require('path');
import url = require('url');
import fs = require('fs');

import { devMenuTemplate } from './menu/dev_menu.template';
import { fileMenuTemplate } from './menu/file_menu.template';
import { editMenuTemplate } from './menu/edit_menu.template';
import { sanitize, resolveData } from './utils';


// Init variable
let mainWindow: any = null;
const menus: any[] = [];
const isDev = process.env.NODE_ENV === 'development' ? true : false;


// Init context menu
if (isDev) {
    contextMenu({
        prepend: (params, browserWindow) => []
    });
}


// Create main window
const createMainWindow = async () => {

    // Initialize main window
    mainWindow = new BrowserWindow({
        width: 1080,
        height: 620,
        minWidth: 1080,
        minHeight: 620,
        // frame: false,
        titleBarStyle: 'customButtonsOnHover',
        backgroundColor: '#3D444C',
        darkTheme: true,
        vibrancy: 'dark',
        webPreferences: {
            nodeIntegration: true,
            // contextIsolation: true,
            // experimentalFeatures: true // For prevent angular/animation error
        }
    });

    // DEV mode => Load app with live reload
    if (isDev) {
        require('electron-reload')(__dirname, {
            electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
            hardResetMethod: 'exit'
        });
        mainWindow.loadURL('http://localhost:4200');
        mainWindow.webContents.openDevTools();

    // PROD mode => Load app
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true,
        }));
    }

    mainWindow.on('closed', () => mainWindow = null);
    mainWindow.once('ready-to-show', () => mainWindow.show());


    // Build menus
    menus.push(fileMenuTemplate);
    menus.push(editMenuTemplate);
    if (isDev) {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

const initHandleToutubeRequest = () => {
    // Add youtube url as referer url for play video with restricted domain
    const filters = [
        'https://*.youtube.com/*',
        'http://*.youtube.com/*'
    ];
    session.defaultSession.webRequest.onBeforeSendHeaders({urls: filters}, (details, callback) => {
        details.requestHeaders['Referer'] = 'https://www.youtube.com';
        callback({cancel: false, requestHeaders: details.requestHeaders});
    });
};

// On app is ready
app.on('ready', () => {
    createMainWindow();
    // initHandleToutubeRequest();

    const filters = [
        'https://*.youtube.com/*',
        'http://*.youtube.com/*'
    ];
    session.defaultSession.webRequest.onBeforeSendHeaders({urls: filters}, (details, callback) => {
        details.requestHeaders['Referer'] = 'https://www.youtube.com';
        callback({cancel: false, requestHeaders: details.requestHeaders});
    });

    console.log('Data path:', storage.getDataPath());
});

// On close app event
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Recreate window when icon is clicked
app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});

// Clear cahe and cookie session before quit
app.on('before-quit', () => {
    if (process.env.NODE_ENV !== 'development') {
        mainWindow.webContents.session.clearStorageData();
    }

    storage.remove('user', (error) => {
        if (error) { throw error; }
    });
});






const errorHandler = function(error) {
    console.error(error);
    const msg: any = {
        /*type : "error",
        title : "Uncaught Exception",
        buttons:["ok", "close"],*/
        width : 400
    };

    switch (typeof error) {
        case 'object':
            msg.title = 'Uncaught Exception: ' + error.code;
            msg.message = error.message;
            break;
        case 'string':
            msg.message = error;
            break;
    }
    msg.detail = 'Please check the console log for more details.';

    mainWindow.send('onElectronError', msg);

    // handleError(error, mainWindow, msg);
};
process.on('uncaughtException', errorHandler);


// ----------------------------------------------------------------------------
// User management
const userDataName = 'user';
const saveUser = 'saveUser';
const getUser = 'getUser';
const getUserResp = 'getUserResp';
const removeUser = 'removeUser';

// Store
ipcMain.on(saveUser, (event, user) => {

    /*
    console.log('===================');
    console.log(saveUser);
    */

    storage.set(userDataName, user, (error) => {
        handleError(error, event.send);
    });

});

// Load
ipcMain.on(getUser, (event, arg) => {

    /*
    console.log('===================');
    console.log(getUser);
    */

    storage.get(userDataName, (error, data) => {
        handleError(error, event.sender, data);
        event.sender.send(getUserResp, data);
    });
});

// Remove
ipcMain.on(removeUser, (event, user) => {

    /*
    console.log('===================');
    console.log(removeUser);
    */

    storage.remove(userDataName, (error) => {
        handleError(error, event.sender);
    });
});



// ----------------------------------------------------------------------------
// Local playlist management
const localPLDataName = 'local-playlists';
const saveLocalPL = 'saveLocalPL';
const getLocalPL = 'getLocalPL';
const getLocalPLResp = 'getLocalPLResp';
const removeLocalPL = 'removeLocalPL';

// Store
ipcMain.on(saveLocalPL, (event, localPlaylists) => {

    /*
    console.log('===================');
    console.log(saveLocalPL);
    */

    storage.set(localPLDataName, resolveData(localPlaylists), (error) => {
        handleError(error, event.sender);
    });
});

// Load
ipcMain.on(getLocalPL, (event) => {

    /*
    console.log('===================');
    console.log(getLocalPL);
    */

    storage.get(localPLDataName, (error, data) => {
        handleError(error, event.sender, data);
        event.sender.send(getLocalPLResp, data);
    });
});

// Remove
ipcMain.on(removeLocalPL, (event) => {

    /*
    console.log('===================');
    console.log(removeLocalPL);
    */

    storage.remove(localPLDataName, (error) => {
        handleError(error, event.sender);
    });
});



// ----------------------------------------------------------------------------
// App state management
const appStateDataName = 'app-state';
const saveAppState = 'saveAppState';
const getAppState = 'getAppState';
const getAppStateResp = 'getAppStateResp';

ipcMain.on(saveAppState, (event, data) => {

    /*
    console.log('===================');
    console.log(saveAppState);
    */

    storage.set(appStateDataName, resolveData(data), (error) => {
        handleError(error, event.sender, data);
    });
});

ipcMain.on(getAppState, (event, arg) => {

    /*
    console.log('===================');
    console.log(getAppState);
    */

    storage.get(appStateDataName, (error, data) => {
        handleError(error, event.sender, data);
        event.sender.send(getAppStateResp, data);
    });
});



// ----------------------------------------------------------------------------
// Get os type management
const getOsType = 'getOsType';
const getOsTypeResp = 'getOsTypeResp';

ipcMain.on(getOsType, (event, data) => {

    /*
    console.log('===================');
    console.log(getOsType);
    */

    event.sender.send(getOsTypeResp, process.platform);
});



// ----------------------------------------------------------------------------
// Download and Convert video to mp3
ipcMain.on('send-convert-video-to-mp3', (event, arg) => {

    const videoId = arg.videoId;
    const filePath = arg.filePath;
    let fileName = arg.fileName;

    if (!videoId) {
        handleError('Error, wrong videoId: ' + videoId, event.sender);
    }

    if (!filePath) {
        handleError('Error, wrong filePath: ' + filePath, event.sender);
    }

    if (!fileName) {
        handleError('Error, wrong fileName: ' + fileName, event.sender);
    }

    if (!videoId || !fileName || !filePath) {
        return;
    }

    fileName = sanitize(fileName, '') + '.mp3';
    let startDL;
    const URL = 'http://www.youtube.com/watch?v=' + videoId;
    const PATH = path.resolve(filePath, fileName);

    const stream = ytdl(videoId, {
        filter: 'audioonly' // ,quality: 'highestaudio'
    })
    .once('response', () => {
        startDL = Date.now();
        event.sender.send('get-progress', { type: 'download', status: 'start' });
    })
    .on('progress', (chunkLength, downloaded, total) => {
        // console.log('DOWNLOAD => progress');
        const floatDownloaded = downloaded / total;
        const downloadedMinutes = (Date.now() - startDL) / 1000 / 60;

        const data = {
            type: 'download',
            status: 'progress',
            progress: {
                percent: (floatDownloaded * 100).toFixed(2),
                downloaded: (downloaded / 1024 / 1024).toFixed(2),
                total: (total / 1024 / 1024).toFixed(2),
                mn: downloadedMinutes.toFixed(2),
                mnRest: (downloadedMinutes / floatDownloaded - downloadedMinutes).toFixed(2)
            }
        };
        event.sender.send('get-progress', data);
    })
    .on('end', () => {
        event.sender.send('get-progress', { type: 'download', status: 'ended' });
    });


    ffmpeg(stream)
        .audioBitrate(128)
        .save(PATH)
        .on('end', () => {
            event.sender.send('get-progress', { type: 'convert', status: 'ended' });
        });
        // .saveToFile(PATH);


    // mp3.pipe();
    // ffmpeg(mp3).audioBitrate(128).format('mp3').pipe(fs.createWriteStream(dlPath))

});

// Resolve file path
ipcMain.on('send-get-save-path', (event, arg) => {

    const edit     = arg.edit;
    const filePath = arg.filePath;
    const defaultPath = app.getPath('downloads') || '';

    const choosenPath = filePath ? filePath : defaultPath;

    if (edit) {
        dialog.showOpenDialog({
            title: 'Select folder',
            defaultPath: choosenPath,
            filters: [ {name: 'All Files', extensions: ['.mp3']} ],
            properties: ['openDirectory', 'createDirectory']
        },
        (selFilePath) => {
            let selPath = selFilePath[0];
            if (!selPath) {
                selPath = defaultPath;
            }
            event.sender.send('get-save-path', selPath);
        });
    } else {
        event.sender.send('get-save-path', choosenPath);
    }
});


const handleError = (error, sender, data?) => {
    // ipcRenderer.send('onElectronError', error);
    if (error) {
        const errorResp = {
            error: error,
            customData: data
        };
        sender.send('onElectronError', errorResp);
        throw error;
    }
};

/*
// Ipc listening in main process.
ipcMain.on('google-token', (event, arg) => {
    console.log(arg); // prints "ping"
    // event.sender.send('asynchronous-reply', 'pong');
});

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg); // prints "ping"
  event.sender.send('asynchronous-reply', 'pong');
});

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg); // prints "ping"
  event.returnValue = 'pong';
});
*/
