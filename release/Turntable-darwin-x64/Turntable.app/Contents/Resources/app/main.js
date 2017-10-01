"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// Setup default environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log("Electron launching with NODE_ENV: " + process.env.NODE_ENV);
// Import dependencies
var path = require("path");
var url = require("url");
var electron_1 = require("electron");
var dev_menu_template_1 = require("./menu/dev_menu_template");
var file_menu_template_1 = require("./menu/file_menu_template");
// Init variable
var mainWindow = null;
var menus = [];
var isDev = process.env.NODE_ENV === 'development' ? true : false;
// Create main window
var createMainWindow = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Initialize main window
        mainWindow = new electron_1.BrowserWindow({
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
        mainWindow.on('closed', function () {
            mainWindow = null;
        });
        // Create menus
        menus = [file_menu_template_1.fileMenuTemplate];
        if (isDev) {
            menus.push(dev_menu_template_1.devMenuTemplate);
        }
        electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(menus));
        return [2 /*return*/];
    });
}); };
// On app is ready
electron_1.app.on('ready', function () {
    createMainWindow();
});
// On close app event
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// Recreate window when icon is clicked
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow();
    }
});
// Ipc listening in main process.
electron_1.ipcMain.on('google-token', function (event, arg) {
    console.log(arg); // prints "ping"
    // event.sender.send('asynchronous-reply', 'pong');
});
electron_1.ipcMain.on('asynchronous-message', function (event, arg) {
    console.log(arg); // prints "ping"
    event.sender.send('asynchronous-reply', 'pong');
});
electron_1.ipcMain.on('synchronous-message', function (event, arg) {
    console.log(arg); // prints "ping"
    event.returnValue = 'pong';
});
//# sourceMappingURL=/Users/amigamac/workspace/web/github/turntable/src-electron/main.js.map