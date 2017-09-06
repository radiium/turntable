"use strict"

const createDMG = require('electron-installer-dmg');
const pJson     = require('../../package.json');
const path      = require('path');

const rootPath  = path.join('./');
const appPath   = path.join(rootPath, 'release-builds', 'Turntable-darwin-x64', 'Turntable.app');
const outPath   = path.join(rootPath, 'release-builds');
const iconPath  = path.join(rootPath, 'src', 'assets', 'icons', 'mac', 'turntable-installer.icns');

const opts = {
    name: pJson.name,
    icon: iconPath,
    overwrite: true,
    appPath: appPath,
    out: outPath,
};

// console.log(opts);

createDMG(opts, function done (err) {
    if (err) { console.log(err); }
});