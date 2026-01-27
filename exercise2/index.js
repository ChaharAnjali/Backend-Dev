const analyzeLog = require("./analyzer");

const filePath = process.argv[2];

if (!filePath) {
  console.log("Usage: node index.js <logFile>");
} else {
  analyzeLog(filePath);
}
