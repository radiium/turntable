process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`Electron launching with NODE_ENV: ${process.env.NODE_ENV}`);

// Dependencies
const electron      = require('electron');
const app           = electron.app;
const Menu: any     = electron.Menu;
const shell: any    = electron.shell;
const BrowserWindow = electron.BrowserWindow;

let mainWindow: any = null;
let template: any;
let menu: any;

if (process.env.NODE_ENV === 'development') {
  // require('electron-debug')();
}


// On close app event
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// On ready app event
app.on('ready', () => {

    // Initialize main window
    mainWindow = new BrowserWindow({
        width: 1080,
        height: 620,
        minWidth: 1080,
        minHeight: 620
    });

    // App entry point
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Clear out the main window when the app is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // mainWindow.webContents.on('did-navigate-in-page', (e: any, url: string) => {
    //   console.log(`Page navigated: ${url}`);
    // });


    // Create menu
    const helpMenu: any = {
        label: 'Help',
        submenu: [{
            label: 'Learn More',
            click: () => {
            shell.openExternal('https://github.com/NathanWalker/angular2-seed-advanced');
            }
        }, {
            label: 'Issues',
            click: () => {
            shell.openExternal('https://github.com/NathanWalker/angular2-seed-advanced/issues');
            }
        }, {
            label: `My Amazing Parent: Minko Gechev's Angular 2 Seed`,
            click: () => {
            shell.openExternal('https://github.com/mgechev/angular2-seed');
            }
        }, {
            label: 'Angular 2',
            click: () => {
            shell.openExternal('https://angular.io/');
            }
        }, {
            label: 'Electron',
            click: () => {
            shell.openExternal('http://electron.atom.io/');
            }
        }, {
            label: 'Electron Docs',
            click: () => {
            shell.openExternal('https://github.com/atom/electron/tree/master/docs');
            }
        }, {
            label: 'Codeology Visualization',
            click: () => {
            shell.openExternal('http://codeology.braintreepayments.com/nathanwalker/angular2-seed-advanced');
            }
        }]
    };

    if (process.platform === 'darwin') {
        template = [{
        label: 'File',
        submenu: [{
                label: `About File`,
                selector: 'orderFrontStandardAboutPanel:'
            }, {
                type: 'separator'
            }, {
                label: 'Services',
                submenu: []
            }, {
                type: 'separator'
            }, {
                label: 'Hide Angular 2 Seed Advanced',
                accelerator: 'Command+H',
                selector: 'hide:'
            }, {
                label: 'Hide Others',
                accelerator: 'Command+Shift+H',
                selector: 'hideOtherApplications:'
            }, {
                label: 'Show All',
                selector: 'unhideAllApplications:'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: () => {
                app.quit();
                }
            }]
        }, {
                label: 'Edit',
                submenu: [{
                label: 'Undo',
                accelerator: 'Command+Z',
                selector: 'undo:'
            }, {
                label: 'Redo',
                accelerator: 'Shift+Command+Z',
                selector: 'redo:'
            }, {
                type: 'separator'
            }, {
                label: 'Cut',
                accelerator: 'Command+X',
                selector: 'cut:'
            }, {
                label: 'Copy',
                accelerator: 'Command+C',
                selector: 'copy:'
            }, {
                label: 'Paste',
                accelerator: 'Command+V',
                selector: 'paste:'
            }, {
                label: 'Select All',
                accelerator: 'Command+A',
                selector: 'selectAll:'
            }]
        }, {
                label: 'View',
                submenu: (process.env.NODE_ENV === 'development') ? [{
                label: 'Reload',
                accelerator: 'Command+R',
                click: () => {
                mainWindow.restart();
                }
            }, {
                label: 'Toggle Full Screen',
                accelerator: 'Ctrl+Command+F',
                click: () => {
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
                }
            }, {
                label: 'Toggle Developer Tools',
                accelerator: 'Alt+Command+I',
                click: () => {
                mainWindow.toggleDevTools();
                }
            }] : [{
                label: 'Toggle Full Screen',
                accelerator: 'Ctrl+Command+F',
                click: () => {
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
                }
            }]
        }, {
                label: 'Window',
                submenu: [{
                label: 'Minimize',
                accelerator: 'Command+M',
                selector: 'performMiniaturize:'
            }, {
                label: 'Close',
                accelerator: 'Command+W',
                selector: 'performClose:'
            }, {
                type: 'separator'
            }, {
                label: 'Bring All to Front',
                ector: 'arrangeInFront:'
            }]
        },
        helpMenu];

        menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);

    } else {
        template = [{
                label: '&File',
                submenu: [{
                label: '&Open',
                accelerator: 'Ctrl+O'
            }, {
                label: '&Close',
                accelerator: 'Ctrl+W',
                click: () => {
                mainWindow.close();
                }
            }]
        }, {
            label: '&View',
            submenu: (process.env.NODE_ENV === 'development') ? [{
            label: '&Reload',
            accelerator: 'Ctrl+R',
            click: () => {
            mainWindow.restart();
            }
        }, {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click: () => {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
        }, {
            label: 'Toggle &Developer Tools',
            accelerator: 'Alt+Ctrl+I',
            click: () => {
            mainWindow.toggleDevTools();
            }
        }] : [{
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click: () => {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
        }]
        },
        helpMenu];

        // Add menu to main window app
        menu = Menu.buildFromTemplate(template);
        mainWindow.setMenu(menu);
    }
});
