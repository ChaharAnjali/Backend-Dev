const fs = require("fs");
const os = require("os");

// Log file path
const logFile = "system-log.txt";

// Function to get system info
function getSystemInfo() {
  const info = `
Time: ${new Date().toLocaleString()}
Platform: ${os.platform()}
CPU Cores: ${os.cpus().length}
Free Memory: ${(os.freemem() / (1024 * 1024)).toFixed(2)} MB
Total Memory: ${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB
-------------------------------
`;
  return info;
}

// Write log every 5 seconds
setInterval(() => {
  const sysInfo = getSystemInfo();
  fs.appendFile(logFile, sysInfo, (err) => {
    if (err) console.log("Error writing log:", err);
    else console.log("System info logged at", new Date().toLocaleTimeString());
  });
}, 5000);