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
console.log(todos);
const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log(method, url);
  let body = [];
  req
    .on("data", (data) => {
      body.push(data);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      let status = 404;
      const response = {
        success: true,
        data: null,
      };
      if (method === "GET" && url === "/todos") {
        status = 200;
        response.success = true;
        response.data = todos;
      } else if (method === "POST" && url === "/todos") {
        const { id, task } = JSON.parse(body);
        if (!id || !task) {
          status = 400;
          response.success = false;
          response.data = null;
        } else {
          todos.push({ id, task });
          status = 201;
          response.success = true;
          response.data = todos;
        }
        res.writeHead(status, { "Content-Type": "application/json" });
        console.log("Hello");
      } else if (method === "PUT" && url.startsWith("/todos/")) {
        const id = url.split("/")[2];
        const index = todos.findIndex((todo) => todo.id === Number(id));
        if (index >= 0) {
          todos.splice(index, 1);
          status = 200;
          response.success = true;
          response.data = todos;
        } else {
          status = 404;
          response.success = false;
        }
      }
      res.end(JSON.stringify(response));
    });
});
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Sever is running on port :", PORT));
