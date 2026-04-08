const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/access.log");

const logger = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const responseTime = Date.now() - start;

        const log = `${new Date().toISOString()} | ${req.method} | ${req.url} | ${res.statusCode} | ${responseTime}ms\n`;

        fs.appendFile(logFilePath, log, (err) => {
            if (err) console.error(err);
        });
    });

    next();
};

module.exports = logger;