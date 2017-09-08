// Import dependencies
import * as path from 'path';
import * as url from 'url';
import { BrowserWindow } from 'electron';

// Init variable
let settingsWindow: any = null;

// Create settings window
export function createSettingsWindow() {

    // Initialize settings window
    settingsWindow = new BrowserWindow({
        width: 500,
        height: 500,
        resizable: false
    });

    // Load settings entry point
    settingsWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'settings.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Clear out the settings window when the app is closed
    settingsWindow.on('closed', () => { settingsWindow = null; });
}
