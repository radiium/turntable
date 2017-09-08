// Import dependencies
import * as path from 'path';
import * as url from 'url';
import { BrowserWindow } from 'electron';

// Init variable
let prefsWindow: any = null;

// Create main window
export function createPrefsWindow() {

    // Initialize main window
    prefsWindow = new BrowserWindow({
        width: 500,
        height: 500,
        resizable: false
    });

    // Load app entry point
    prefsWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'preferences.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Clear out the main window when the app is closed
    prefsWindow.on('closed', () => { prefsWindow = null; });
}
