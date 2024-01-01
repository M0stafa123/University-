import express, { request, response } from "express";
import { MongoClient } from "mongodb";
import router from "../routes";
import fs from "fs";
const port = 5000;
const app = express();
var cors = require("cors");

app.use(cors());
app.use(router);

const url = "mongodb://0.0.0.0:27017";
const client = new MongoClient(url);

const db = client.db("UNIVERSITY");

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});

app.get("/", async (req, res) => {
  await client.connect();

  res.send("Connected successfully to server");
});

app.post("/api2", async (req, res) => {
  await client.connect();
  // fs.readFile(
  //   `C:/Users/PC/Desktop/New folder/MongoDB-Project/src/test.txt`,
  //   "utf-8",
  //   (err, data) => {
  //     res.send(JSON.parse(data));
  //   }
  // );
});
