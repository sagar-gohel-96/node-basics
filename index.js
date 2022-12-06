const path = require("path");
const fs = require("fs");
const http = require("http");
const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html");
  res.write("<h1>hello world!</h1>");
  res.end("backend developers!");
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Sever is running on port :", PORT));
