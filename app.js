const env = process.env.NODE_ENV || "development"; // for app.js to connect to postgresQL
const express = require("express");
const app = express();
const ejs = require("ejs");
const PORT = 5000;
const path = require("path");
const config = require("./config.js")[env];



app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});

module.exports = app    // for testing