// Import dependencies
import { app, BrowserWindow } from 'electron';
import { createPrefsWindow} from '../preferences/preferences';

// Export menu items object
export const fileMenuTemplate = {
    label: 'File',
        submenu: [{
            label: 'Preferences',
            click: () => {
            // prefsWindow.show();
            createPrefsWindow();
            }
        }, {
            label: `About File`,
            selector: 'orderFrontStandardAboutPanel:'
        }, {
            type: 'separator'
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
};
