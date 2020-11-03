/**初始化事件 */
const Event = require("events");
let e = new Event.EventEmitter();
module.exports.eventInstace = e;
