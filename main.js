// handle setupevents as quickly as possible
const setupEvents = require('./installer/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}
 
const electron = require('electron');
const Menu      = electron.Menu;
const url      = require('url');
const path     = require('path');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1080,
        height: 600,
        minWidth: 1080,
        minHeight: 370,
        webPreferences: {
            nativeWindowOpen: true
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    // Menu
    /*
    const menuTemplate = [
        {
            label: 'Electron',
            submenu: [{
                label: 'About',
                click: () => {
                    console.log('About Clicked');
                }
            }, {
                role: 'help',
            },{
                type: 'separator'
            }, {
                label: 'Quit',
                click: () => {
                    app.quit();
                }
            }]
        }
    ];
    */

    let menuTemplate = [];

    if (process.platform === 'darwin') {
        menuTemplate.push({
            label: app.getName(),
            submenu: [
                {role: 'toggledevtools'},
                {role: 'about'},
                {type: 'separator'},
                {role: 'reload'},
                {role: 'hide'},
                {role: 'hideothers'},
                {role: 'unhide'},
                {type: 'separator'},
                {role: 'quit'}
            ]
        });
    } else {
        menuTemplate.push({
            label: app.getName(),
            submenu: [
                {role: 'toggledevtools'},
                {role: 'about'},
                {type: 'separator'},
                {role: 'reload'},
                {role: 'minimize'},
                {type: 'separator'},
                {role: 'quit'}
            ]
        });
    }

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
