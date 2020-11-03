// Modules to control application life and create native browser window
const { log } = require("console");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const setting = require("./setting");
const Menu = require("electron").Menu;
Menu.setApplicationMenu(null); //取消菜单栏
let mainWindow = null;

//#region 限制只可以打开一个应用, 4.x的文档
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
      mainWindow.show()
    }
  })
}
//#endregion


function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    resizable: true,
    maximizable: true,
    title:setting.title,
    fullscreen: false,
    icon: setting.icon,
    width: setting.height || 200,
    height: setting.width || 200,
    webPreferences: {
      webviewTag: true,
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true, // 是否集成 Nodejs,把之前预加载的js去了，发现也可以运行
    },
  });

  if(setting.openDevTools){
    mainWindow.webContents.openDevTools({mode:'detach'});
  }

  // mainWindow.webContents.print

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


ipcMain.on("get.printers",(event, callback)=>{
  let printers = mainWindow.webContents.getPrinters();
  event.sender.send('get.printer.reply', printers);
})