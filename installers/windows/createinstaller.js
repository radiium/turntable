"use strict"

const createExe = require('electron-winstaller').createWindowsInstaller;
const pJson     = require('../../package.json');
const path      = require('path');

const rootPath  = path.join('./');
const appPath   = path.join(rootPath, 'release-builds', 'Turntable-win32-ia32/');
const outPath   = path.join(rootPath, 'release-builds');
const iconPath  = path.join(rootPath, 'src', 'assets', 'icons', 'win', 'turntable-installer.ico');

const opts = {
    name: pJson.name,
    authors: 'Radiium',
    description: "A simple youtube dj app",
    noMsi: true,
    exe: 'Turntable-Installer.exe',
    setupExe: 'Turntable-Installer.exe',
    setupIcon: iconPath,
    appDirectory: appPath,
    outputDirectory: outPath
};

console.log(opts);

getInstallerConfig()
.then(createExe)
.catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});

function getInstallerConfig () {
    console.log('Creating windows installer');
    return Promise.resolve(opts);
}
