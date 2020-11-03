const setting = require("../setting");
module.exports = {
    log(){
        if(setting.mode === "development"){
            console.log.apply(console,arguments);
        }
    }
}