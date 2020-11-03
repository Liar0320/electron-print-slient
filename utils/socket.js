let ws = require("ws");
const { socketPort } = require("./setting");
const { eventInstace } = require("./utils/event");
const wsConfig = {
    port:socketPort
}
const wss = new ws.Server({
    port:wsConfig.port
})
wss.on("connection",(client,req)=>{
    client.on("open",()=>{
        client.send({message:"连接成功"});
    })
    client.on("message",(e)=>{
        let msg = null;
        try {
          msg = JSON.parse(e);
        } catch (error) {
            client.send(JSON.stringify({message:"参数转换json失败"}));
        }
        
        if(msg.handleType !== void 0){
            eventInstace.emit(msg.handleType,msg.data);
        }
        
    })
})