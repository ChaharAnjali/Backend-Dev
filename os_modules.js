const os = require("os");

const totalMemory = os.totalmem()/(1024*1024*1024);
const freeMemory = os.freemem()/(1024*1024*1024);

const platform = os.platform();
const uptime = os.uptime()/(3600);

const model = os.cpus()[0].model

const systemlog = 
Totalmemory: ${totalmemory}
Freememory: ${freeMemory}
Uptime: ${uptime}
Model: ${model}
platform: ${platform}

setInterval(()=>{
    fs.appendFile("./system_log.txt", systemlog, (err)=>{
        if(err){
            console.log(err)

        }
    })
}, 3600)
