import { app, BrowserWindow, Menu, shell } from 'electron';
import {join } from "path";
let menu;
let template;
let mainWindow = null;


if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});



app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });
  const rootPath =  process.env.NODE_ENV === 'development' ? __dirname : app.getAppPath();
  console.log(rootPath);
  mainWindow.loadURL(join(rootPath +`/app/app.html`));

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.maximize();
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
