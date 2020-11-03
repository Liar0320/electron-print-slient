// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
const { ipcRenderer } = require("electron");
const setting = require("./setting")
document.title = setting.title;

let app = document.getElementById("app");
app.setAttribute("src",setting.appUrl);
// app.addEventListener("did-start-loading", function () {
//     document.getElementById("loading").remove()
// });
app.addEventListener("did-stop-loading", function () {
    document.getElementById("loading").remove()
});

ipcRenderer.send("get.printers");
ipcRenderer.on("get.printer.reply",(e,arg)=>{
    console.log(arg); // prints "pong"
})