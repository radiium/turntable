// Setup default environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`Electron launching with NODE_ENV: ${process.env.NODE_ENV}`);

// Import dependencies
import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron';
import { devMenuTemplate } from './menu/dev_menu.template';
import { fileMenuTemplate } from './menu/file_menu.template';
import { editMenuTemplate } from './menu/edit_menu.template';
import { session } from 'electron';

import * as storage from 'electron-json-storage';

// Init variable
let mainWindow: any = null;
const menus: any[] = [];
const isDev = process.env.NODE_ENV === 'development' ? true : false;

// Create main window
const createMainWindow = async () => {

    // Initialize main window
    mainWindow = new BrowserWindow({
        width: 1080,
        height: 620,
        minWidth: 1080,
        minHeight: 620,
        webPreferences: {
            nodeIntegration: true
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
        console.log('user removed');
    });
});




// Store user at signin
ipcMain.on('save-user', (event, user) => {
    storage.set('user', user, (error) => {
        if (error) { throw error; }
        console.log('user saved');
    });

});

// Remove user from storage at signout
ipcMain.on('remove-user', (event, user) => {
    storage.remove('user', (error) => {
        if (error) { throw error; }
        console.log('user removed');
    });
});

// Get user from storage
ipcMain.on('send-get-user', (event, arg) => {
    storage.get('user', (err, data) => {
        if (err) { throw err; }
        event.sender.send('get-user', data);
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
