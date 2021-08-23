//@ts-check

import express from "express";
import fs from "fs/promises";

const app = express();

const PORT = 5000;

app.use("/", async (req, res, next) => {
  console.log("Middleware 1");

  const fileContent = await fs.readFile(".gitignore", "utf-8");

  const reqAt = new Date();
  //@ts-ignore
  req.reqAt = reqAt;
  //@ts-ignore
  req.fileContent = fileContent;
  next();
});

app.use((req, res) => {
  console.log("MiddleWare 2");
  //@ts-ignore
  res.send(`hello, express: ${req.reqAt} ${req.fileContent}`);
});

app.listen(PORT, () => {
  console.log("listening");
});
