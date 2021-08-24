//@ts-check

import express from "express";
import router from "./routers/user.js";

const app = express();

app.use(express.json()); //json으로 받겠다
app.set("view engine", "pug");
app.set("views", "src/views"); //파일 경로

const PORT = 5000;

app.use("/users", router);
app.use("/public", express.static("src/public"));

app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500;
  res.send(err.message);
});

//module.exports = app;
export default app;
