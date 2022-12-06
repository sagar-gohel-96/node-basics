const path = require("path");
const fs = require("fs");
const http = require("http");
const todos = [
  {
    id: 1,
    task: "task 1",
  },
  {
    id: 2,
    task: "task 2",
  },
  {
    id: 3,
    task: "task 3",
  },
];
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({
    success: true,
    data: todos,
  }));
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Sever is running on port :", PORT));
