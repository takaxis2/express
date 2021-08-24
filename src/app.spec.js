//import supertest from "supertest";
const supertest = require("supertest");
import app from "./app.js";
//const app = require("./app.js");

const request = supertest(app);

test("retrieve user json", async () => {
  const result = await request.get("/users/15").accept("application/json");
  //console.log(result.body);
  expect(result.body).toMatchObject({
    nickname: expect.any(String),
  });
});

test("retrieve user page", async () => {
  const result = await request.get("/users/15").accept("text/html");
  //console.log(result.text);
  expect(result.text).toMatch(/^<!DOCTYPE html>.*<\/html>$/);
});

test("update nickname", async () => {
  const newNickname = "newNickname";

  const res = await request
    .post("/users/15/nickname")
    .send({ nickname: newNickname });
  expect(res.status).toBe(200);

  const userResult = await request.get("/users/15").accept("application/json");
  expect(userResult.status).toBe(200);
  expect(userResult.body).toMatchObject({ nickname: newNickname });
});
