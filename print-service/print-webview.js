const { eventInstace } = require("./utils/event");
const { log } = require("./utils/log");
const setting = require("./setting");
const initSetting = JSON.parse(JSON.stringify(setting));

let printWebview = document.getElementById("printWebview");
printWebview.addEventListener("dom-ready", function () {
  if (setting.openDevTools) {
    printWebview.openDevTools();
  }
});

printWebview.addEventListener("ipc-message", (event) => {
  if (event.channel === "ready-print") {
    log("ready-print", setting.printConfig);
    try {
      printWebview.print({ ...setting.printConfig });
    } catch (error) {
      console.log(e,error);
    }
    // , (data) => {
    //   log("打印结果：", data);
    // }
  }
});

/**转发不同进程的侍剑 */
eventInstace.on("print", (data) => {
  printWebview.send("print-action", data);
});

/**转发不同进程的侍剑 */
eventInstace.on("initPrintConfig", (data) => {
  log("initPrintConfig：", data);
  if (data === "false") {
    Object.assign(setting.printConfig, initSetting.printConfig);
  } else {
    Object.assign(setting.printConfig, data);
  }
});
