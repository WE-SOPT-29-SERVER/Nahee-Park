const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// 앞서 정의된 라우터들을 경로에 맞게 use해주는 것
// api 폴더로 연결
router.use("/api", require("./api"));

module.exports = router;
