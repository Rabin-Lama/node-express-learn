const app = express();
const fs = require("fs");
const path = require("path");
const router = express.Router();
const express = require("express");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function test(req, res, next) {
  req.name = "rabin";
  console.log("middleware");
  next();
}

app.use(test);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/login.html"));
});

router.post("/login", (req, res) => {
  const username = "rabin";
  const password = "rabin";

  if (req.body.username === username && req.body.password === password) {
    const data = require("./data.json");
    console.log("success");
    res.status(200).send(data);
  } else {
    console.log("fail");
    res.status(500).send("fail");
  }
});

router.get("/todos", (req, res) => {
  console.log(req.name);
  var data = fs.readFileSync("data.json");
  data = JSON.parse(data);

  res.status(200).send(data);
});

router.post("/todos", (req, res) => {
  var data = fs.readFileSync("data.json");
  data = JSON.parse(data);

  data.push({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  });
  var newData = JSON.stringify(data);
  fs.writeFile("data.json", newData, (err) => {
    // error checking
    if (err) throw err;

    console.log("New data added");
  });
  res.status(200).send(data);
});

router.delete("/todos", (req, res) => {
  const data = require("./data.json");
  res.status(200).send(data);
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
