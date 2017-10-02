// Import dependencies
import { app, BrowserWindow } from 'electron';

// Export menu items object
export const editMenuTemplate = {
    label: 'Edit',
        submenu: [{
            label: 'Cut',
            accelerator: 'CmdOrCtrl+X',
            selector: 'cut:'
        }, {
            label: 'Copy',
            accelerator: 'CmdOrCtrl+C',
            selector: 'copy:'
        }, {
            label: 'Paste',
            accelerator: 'CmdOrCtrl+V',
            selector: 'paste:'
        }]
};
