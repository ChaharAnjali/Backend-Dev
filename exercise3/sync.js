const fs = require("fs");
const path = require("path");

function syncDirectories(sourceDir, destDir) {
  try {
    const sourceFiles = fs.readdirSync(sourceDir);

    sourceFiles.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);

      const stat = fs.statSync(sourcePath);

      if (stat.isFile()) {
        if (!fs.existsSync(destPath)) {
          fs.copyFileSync(sourcePath, destPath);
          console.log(`Copied: ${file}`);
        } else {
          console.log(`Skipped (already exists): ${file}`);
        }
      }
    });

  } catch (err) {
    console.log("Error during synchronization:", err.message);
  }
}

module.exports = syncDirectories;
