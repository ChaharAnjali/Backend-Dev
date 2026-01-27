const syncDirectories = require("./sync");

const source = process.argv[2];
const destination = process.argv[3];

if (!source || !destination) {
  console.log("Usage: node index.js <sourceDir> <destinationDir>");
} else {
  syncDirectories(source, destination);
}
