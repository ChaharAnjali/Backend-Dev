const fs = require("fs");
const readline = require("readline");

function analyzeLog(filePath) {
  let errorCount = 0;
  let infoCount = 0;
  let warningCount = 0;
  let totalLines = 0;

  const stream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  rl.on("line", (line) => {
    totalLines++;

    if (line.includes("ERROR")) errorCount++;
    else if (line.includes("INFO")) infoCount++;
    else if (line.includes("WARNING")) warningCount++;
  });

  rl.on("close", () => {
    console.log("📊 Log File Summary Report");
    console.log("--------------------------");
    console.log("Total Lines:", totalLines);
    console.log("Errors:", errorCount);
    console.log("Warnings:", warningCount);
    console.log("Info:", infoCount);
  });

  stream.on("error", (err) => {
    console.log("Error reading log file:", err.message);
  });
}

module.exports = analyzeLog;
