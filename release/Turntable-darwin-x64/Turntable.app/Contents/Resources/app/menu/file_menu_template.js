"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
var electron_1 = require("electron");
// Export menu items object
exports.fileMenuTemplate = {
    label: 'File',
    submenu: [{
            label: 'Settings',
            click: function () {
                // createSettingsWindow();
            }
        }, {
            label: "About File",
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
            click: function () {
                electron_1.app.quit();
            }
        },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' }
    ]
};
//# sourceMappingURL=/Users/amigamac/workspace/web/github/turntable/src-electron/menu/file_menu_template.js.map