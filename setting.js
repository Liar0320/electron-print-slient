// const { log } = require("./utils/log");
let envSetting = {};
if (process.env?.NODE_ENV === "development") {
  envSetting = require("./setting.dev");
} else {
  envSetting = require("./setting.prod");
}
// envSetting = require("./setting.prod");
module.exports = {
  mode: "production",
  openDevTools: false,
  width: 1200,
  height: 600,
  socketPort:9573,
  printConfig: {
    silent: false,
    printBackground: true,
    deviceName: "Microsoft Print to PDF",
    landscape: false,
    margins: { marginType: "custom", top: 0, bottom: 0, left: 0, right: 0 },
    scaleFactor: 0.2,
  },
  icon: "./app.ico",
  title: "自动打印服务",
  appUrl: "./test/demo.html",
  ...envSetting,
};
