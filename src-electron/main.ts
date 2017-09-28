// Setup default environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`Electron launching with NODE_ENV: ${process.env.NODE_ENV}`);

// Import dependencies
import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron';
import { devMenuTemplate } from './menu/dev_menu_template';
import { fileMenuTemplate } from './menu/file_menu_template';

// Init variable
let mainWindow: any = null;
let menus: any[] = [];
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

    // Create menus
    menus = [fileMenuTemplate];
    if (isDev) { menus.push(devMenuTemplate); }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// On app is ready
app.on('ready', () => {
    createMainWindow();
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
