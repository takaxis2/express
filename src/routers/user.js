import express from "express";

const router = express.Router();

const USER = {
  13: {
    nickname: "qwe",
  },
  15: {
    nickname: "asd",
  },
};

router.get("/", (req, res) => {
  res.send("User List");
});

router.param("id", async (req, res, next, value) => {
  //파라미터로 들어온값은 4번째 인수
  //async로 할경우 try/catch로 해야 함, promise 핸들링이 안돼서 터짐
  try {
    const user = USER[value];

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;

      throw err;
    }

    //@ts-ignore
    req.user = USER[value];
    next();
  } catch (err) {
    //next()에 인자를 넣어주면 에러가 된다
    next(err);
  }
});

router.get("/:id", (req, res) => {
  const resMimeType = req.accepts(["json", "html"]);

  if (resMimeType === "json") {
    //@ts-ignore
    res.send(req.user);
  } else if (resMimeType === "html") {
    res.render("user-profile", {
      //@ts-ignore
      nickname: req.user.nickname,
    });
  }
});

router.post("/", (req, res) => {
  //register
  res.send("Root - POST");
});

export default router;
