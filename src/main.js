//@ts-check

import express from "express";

const app = express();

const PORT = 5000;

app.use("/", (req, res) => {
  res.send(`hello, express`);
});

app.listen(PORT, () => {
  console.log("listening");
});
