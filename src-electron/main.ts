// Setup default environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`Electron launching with NODE_ENV: ${process.env.NODE_ENV}`);

// Import dependencies
import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow, ipcMain, Menu, shell, dialog } from 'electron';
import { devMenuTemplate } from './menu/dev_menu.template';
import { fileMenuTemplate } from './menu/file_menu.template';
import { editMenuTemplate } from './menu/edit_menu.template';
import { session } from 'electron';
import * as contextMenu from 'electron-context-menu';
import * as storage from 'electron-json-storage';
import * as ytdl from 'ytdl-core';
import * as fs from 'fs';
import * as readline from 'readline'
import * as ffmpeg from 'fluent-ffmpeg'

// Init variable
let mainWindow: any = null;
const menus: any[] = [];
const isDev = process.env.NODE_ENV === 'development' ? true : false;

if (isDev) {
    // Init context menu
    contextMenu({
        prepend: (params, browserWindow) => [
            /*
            {
            label: 'Rainbow',
            // Only show it when right-clicking images
            visible: true // params.mediaType === 'image'
            }
            */
    ]
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
            experimentalFeatures: true
        }
    });

    // Load app entry point
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
    }));

    // Clear out the main window when the app is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Build menus
    menus.push(fileMenuTemplate);
    menus.push(editMenuTemplate);
    if (isDev) { menus.push(devMenuTemplate); }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// On app is ready
app.on('ready', () => {
    createMainWindow();

    // Add youtube url as referer url for play video with restricted domain
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
    if (mainWindow === null) { createMainWindow(); }
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


// ----------------------------------------------------------------------------
// User management

// Store user at signin
ipcMain.on('save-user', (event, user) => {
    storage.set('user', user, (error) => {
        if (error) { throw error; }
    });

});

// Remove user from storage at signout
ipcMain.on('remove-user', (event, user) => {
    storage.remove('user', (error) => {
        if (error) { throw error; }
    });
});

// Get user from storage
ipcMain.on('send-get-user', (event, arg) => {
    storage.get('user', (err, data) => {
        if (err) { throw err; }
        event.sender.send('get-user', data);
    });
});



// ----------------------------------------------------------------------------
// Local playlist management

// Store local playlist
ipcMain.on('send-save-local-playlists', (event, localPlaylists) => {
    storage.set('localPlaylists', localPlaylists, (error) => {
        if (error) { throw error; }
    });
});

// Get local playlist from storage
ipcMain.on('send-get-local-playlists', (event) => {
    storage.get('localPlaylists', (err, localPlaylists) => {
        if (err) { throw err; }
        event.sender.send('get-local-playlists', localPlaylists);
    });
});

// Remove user from storage at signout
ipcMain.on('send-remove-local-playlists', (event) => {
    storage.remove('localPlaylists', (error) => {
        if (error) { throw error; }
    });
});

/*
// Remove user from storage at signout
ipcMain.on('remove-local-playlist', (event, user) => {
    storage.remove('user', (error) => {
        if (error) { throw error; }
        console.log('user removed');
    });
});
*/


// ----------------------------------------------------------------------------
// App state management

// Store app state
ipcMain.on('send-save-app-state', (event, data) => {
    storage.set('app-state', data, (error) => {
        if (error) { throw error; }
    });

});

// Get app state
ipcMain.on('send-get-app-state', (event, arg) => {
    storage.get('app-state', (err, data) => {
        if (err) { throw err; }
        event.sender.send('get-app-state', data);
    });
});


// Convert video to mp3
ipcMain.on('send-convert-video-to-mp3', (event, arg) => {
    const url = 'http://www.youtube.com/watch?v=' + arg.id;
const dlPath = path.resolve(app.getPath('downloads'), arg.title + '.mp3');
    dialog.showSaveDialog({
        defaultPath: dlPath || '',
    }, (fileName) => {

        console.log('showSaveDialog', fileName);
        if (fileName === undefined) return;
        let starttime;
        const mp3 = ytdl(url, { filter: 'audioonly' });


        mp3.once('response', () => {
            starttime = Date.now();
        });

        mp3.on('progress', (chunkLength, downloaded, total) => {
            const floatDownloaded = downloaded / total;
            const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`${(floatDownloaded * 100).toFixed(2)}% downloaded`);
            process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
            process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
            process.stdout.write(`, estimated time left: ${(downloadedMinutes / floatDownloaded - downloadedMinutes).toFixed(2)}minutes `);
            readline.moveCursor(process.stdout, 0, -1);

            const data = {
                percent: (floatDownloaded * 100).toFixed(2),
                downloaded: (downloaded / 1024 / 1024).toFixed(2),
                total: (total / 1024 / 1024).toFixed(2),
                mn: downloadedMinutes.toFixed(2),
                mnRest: (downloadedMinutes / floatDownloaded - downloadedMinutes).toFixed(2)
            };
            event.sender.send('get-dl-progress', data);
        });

        mp3.on('end', () => {
            process.stdout.write('\n\n');
            event.sender.send('get-dl-progress', 'succes');
        });

        mp3.on('info', (err, info) => {
            // console.log('info', info, err);
        });

        // mp3.pipe();
        ffmpeg(mp3).audioBitrate(128).format('mp3').pipe(fs.createWriteStream(fileName))

        console.log('ENDED');

    });

});









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
