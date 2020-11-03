//引入ipcRenderer对象
const { log } = require("../utils/log");
const { ipcRenderer } = require("electron");
// const { readFileSync } = require("fs");

// //监听渲染线程传过来的print-action事件
// ipcRenderer.on('print-action', function(e,data) {
//   document.body.innerHTML = readFileSync("./test/ticket.html","utf-8") || data;
//   log(document.body.innerHTML);
//   //通过ipcRenderer对象的sendToHost方法和渲染线程通讯，告诉渲染线程打印的内容已经准备完毕，请开始打印操作
//   ipcRenderer.sendToHost('ready-print')
// });


//监听渲染线程传过来的print-action事件
ipcRenderer.on('print-action', function(e,data) {
  document.body.innerHTML = data;
  log(document.body.innerHTML);
  //通过ipcRenderer对象的sendToHost方法和渲染线程通讯，告诉渲染线程打印的内容已经准备完毕，请开始打印操作
  ipcRenderer.sendToHost('ready-print')
});

log("装载print进程成功");