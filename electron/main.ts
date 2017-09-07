// console.log(process.env);
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`Electron launching with NODE_ENV: ${process.env.NODE_ENV}`);

// electron
const electron      = require('electron');
const app           = electron.app;
const Menu: any     = electron.Menu;
const shell: any    = electron.shell;
const BrowserWindow = electron.BrowserWindow;
// const {crashReporter} = require('electron');

let mainWindow: any = null;
let template: any;
let menu: any;

// app
import {Sample} from './sample/';

// Sample
// You would need a valid `submitURL` to use
// crashReporter.start({
//   productName: 'YourName',
//   companyName: 'YourCompany',
//   submitURL: 'https://your-domain.com/url-to-submit',
//   autoSubmit: true
// })

if (process.env.NODE_ENV === 'development') {
  // require('electron-debug')();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {

    // Initialize the window to our specified dimensions
    mainWindow = new BrowserWindow({
        width: 1080,
        height: 620,
        minWidth: 1080,
        minHeight: 620
    });

    // Tell Electron where to load the entry point from
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Clear out the main window when the app is closed
    mainWindow.on('closed', () => {
    mainWindow = null;
    });

    // mainWindow.webContents.on('did-navigate-in-page', (e: any, url: string) => {
    //   console.log(`Page navigated: ${url}`);
    // });


    const SampleMenu: any = {
        label: 'Sample',
        submenu: []
    };

    for (const sam of Sample.SAMPLES_ARRAY) {
        const code = sam.code;
        const sampleOption = {
            label: sam.title,
            click: () => {
                console.log(`Change sample: ${code}`);
                mainWindow.webContents
                .executeJavaScript(`window.dispatchEvent(new CustomEvent('changeSample', {detail: { value: '${code}'} }));`);
            }
        };
        SampleMenu.submenu.push(sampleOption);
    }
    console.log(SampleMenu);

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
        SampleMenu,
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
        SampleMenu,
        helpMenu];
        menu = Menu.buildFromTemplate(template);
        mainWindow.setMenu(menu);
    }

});
