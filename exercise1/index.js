const fs = require("fs");

// Read file
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file");
    return;
  }

  // Count words
  const words = data.trim().split(/\s+/);
  const wordCount = words.length;

  // Write result to new file
  fs.writeFile("output.txt", `Word Count: ${wordCount}`, (err) => {
    if (err) {
      console.log("Error writing file");
    } else {
      console.log("Word count written to output.txt");
    }
  });
});