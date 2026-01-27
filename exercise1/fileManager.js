const fs = require("fs");
const path = require("path");

// Read File
function readFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file:", err.message);
      return;
    }
    console.log("File Content:\n", data);
  });
}

// Write File
function writeFile(filePath, content) {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.log("Error writing file:", err.message);
      return;
    }
    console.log("File written successfully");
  });
}

// Copy File
function copyFile(source, destination) {
  fs.copyFile(source, destination, (err) => {
    if (err) {
      console.log("Error copying file:", err.message);
      return;
    }
    console.log("File copied successfully");
  });
}

// Delete File
function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Error deleting file:", err.message);
      return;
    }
    console.log("File deleted successfully");
  });
}

// List Directory
function listDirectory(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.log("Error reading directory:", err.message);
      return;
    }
    console.log("Directory Contents:");
    files.forEach(file => console.log(file));
  });
}

module.exports = {
  readFile,
  writeFile,
  copyFile,
  deleteFile,
  listDirectory
};
