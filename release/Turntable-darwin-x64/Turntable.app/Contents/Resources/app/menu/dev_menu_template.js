"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
var electron_1 = require("electron");
// Export menu items object
exports.devMenuTemplate = {
    label: 'Development',
    submenu: [{
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click: function () {
                electron_1.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
            }
        }, {
            label: 'Toggle DevTools',
            accelerator: 'Alt+CmdOrCtrl+I',
            click: function () {
                electron_1.BrowserWindow.getFocusedWindow().toggleDevTools();
            }
        }, {
            label: 'Quit',
            accelerator: 'CmdOrCtrl+Q',
            click: function () {
                electron_1.app.quit();
            }
        }]
};
//# sourceMappingURL=/Users/amigamac/workspace/web/github/turntable/src-electron/menu/dev_menu_template.js.map