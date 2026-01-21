const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {

  // Only allow GET requests
  if (req.method === "GET" && req.url.startsWith("/product")) {

    // Parse URL with query params
    const parsedUrl = url.parse(req.url, true);
    const { name, price, discount } = parsedUrl.query;

    const priceNum = Number(price);
    const discountNum = Number(discount);

    // Validation
    if (!name || isNaN(priceNum) || isNaN(discountNum)) {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end("<h2>Invalid Query Parameters</h2>");
      return;
    }

    // Calculate final price
    const discountAmount = (priceNum * discountNum) / 100;
    const finalPrice = priceNum - discountAmount;

    // Log to file
    const logData = `${new Date().toISOString()} | Product: ${name} | Price: ${priceNum} | Discount: ${discountNum}% | Final: ${finalPrice}\n`;
    fs.appendFile("searches.txt", logData, () => {});

    // Send HTML response
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Product Search</title>
          <style>
            body {
              font-family: Arial;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .card {
              background: white;
              padding: 20px;
              border-radius: 10px;
              width: 400px;
              margin: auto;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h2 {
              color: #2c3e50;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>Product Details</h2>
            <p><b>Product Name:</b> ${name}</p>
            <p><b>Original Price:</b> ₹${priceNum}</p>
            <p><b>Discount:</b> ${discountNum}%</p>
            <p><b>Final Price:</b> ₹${finalPrice}</p>
          </div>
        </body>
      </html>
    `);

  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h2>Page Not Found</h2>");
  }
});

server.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});