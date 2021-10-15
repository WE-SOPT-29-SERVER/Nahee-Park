const express = require("express"); // express 모듈 불러오기
const router = express.Router(); // Router() 미들웨어 불러오기

// GET method로 blog/ 요청이 들어온다면 (미들웨어 역할)
router.get("/post", (req, res) => {
  // 해당 로직을 실행
  const result = {
    status: 200,
    message: "/api/blog/post에 GET메소드를 보냄",
  };

  // 우리가 반환해주는 response 객체
  res.status(200).send(result);
});

module.exports = router; // 생성한 router 객체를 모듈로 반환
