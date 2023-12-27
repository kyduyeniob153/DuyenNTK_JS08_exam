const { log } = require("console");
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/api/v1/todos", (req, res) => {
  const jsonString = fs.readFileSync(path.join(__dirname, "./todos.json"));
  const jsonData = JSON.parse(jsonString);
  res.status(200).json(jsonData);
});

app.get("/api/v1/todos/:id", (req, res) => {
  const jsonString = fs.readFileSync(path.join(__dirname, "./todos.json"));
  const jsonData = JSON.parse(jsonString);
  const todo = jsonData.find((t) => t.id == req.params.id);
  res.status(200).json(todo);
});

app.post("/api/v1/todos", (req, res) => {
  const jsonString = fs.readFileSync(path.join(__dirname, "./todos.json"));
  const jsonData = JSON.parse(jsonString);

  const { userId, title, completed } = req.body;
  const dataCreate = {
    userId,
    title,
    completed,
    id: jsonData[jsonData.length - 1].id + 1,
  };

  jsonData.push(dataCreate);
  fs.writeFileSync(
    path.join(__dirname, "./todos.json"),
    JSON.stringify(jsonData, null, 2),
    { encoding: "utf-8" }
  );
  res.status(200).json(dataCreate);
});

// cap nhap todo
app.put("/api/v1/todos/:id", => (res,req) {
    const jsonString = fs.readFileSync(path.join(__dirname, "./todos.json"));
  const jsonData = JSON.parse(jsonString);

  const { userId, title, completed } = req.body;
  const listAfterUpdate = jsonData.map(data) => {
    if (data.id == req.params.id) {
        data.userId = userId;
        data.title = title;
        data.completed = completed;
    }
    return data;
});
  fs.writeFileSync(
    path.join(__dirname, "./todos.json"),
    JSON.stringify(jsonData, null, 2),
    { encoding: "utf-8" }
  );
  res.status(200).json(dataCreate);
});

// delete todo
app.delete("/api/v1/todos/:id", => (res,req) {

})

app.listen(8082, () => {
  console.log("Server is running at port ");
});
