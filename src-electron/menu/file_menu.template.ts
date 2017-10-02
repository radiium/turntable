// Import dependencies
import { app, BrowserWindow } from 'electron';

// Export menu items object
export const fileMenuTemplate = {
    label: 'File',
        submenu: [{
            label: `About File`,
            selector: 'orderFrontStandardAboutPanel:'
        }, {
            type: 'separator'
        }, {
            label: 'Hide Turntable',
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
