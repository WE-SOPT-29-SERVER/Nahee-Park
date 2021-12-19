const express = require('express');
const router = express.Router();
const util = require('../lib/util');
const statusCode = require('../constants/statuscode');
const responseMessage = require('../constants/responseMessage');

const users = require('../dbMockup/user');

//1. 회원가입
/*
sign up
METHOD : post
url : localhost:3000/user/signup
REQUEST BODY : id, password, email
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 유저 정보
*/
router.post('/signup', (req, res) => {
  // params, query 받는 방법
  //   const something = req.query;
  //   const something = req.params;
  // email,password 를 클라에서 보내줌
  const { name, email, password } = req.body;

  //   requet body에 정보가 부족할 때
  if (!email || !name || !password) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.BAD_REQUEST));
  }

  //   받은 정보가 중복될 때
  const alreadyUser = users.filter((obj) => obj.email === email).length > 0;
  if (alreadyUser) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL));
  }
  const newUser = {
    id: users.length + 1,
    name,
    password,
    email,
  };

  res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATED_USER, newUser));
});

// 2. 로그인
/*
login
METHOD : post
url : localhost:3000/user/login
REQUEST BODY : id, password
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 비밀번호를 제외한 유저 정보 
*/
// query : /user?age=30
// param: /user/4

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  //  request 데이터 확인
  if (!email || !password) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  const user = users.filter((user) => user.email)[0];

  if (!user) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
  }

  if (user.password !== password) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
  }

  res.status(statusCode.OK).send(
    util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }),
  );

  // 유저 검색 히스토리 저장
  // 1. 검색 결과 반환
  // 2. 검색 히스토리 저장

  // db랑 상호작용할 때 transaction -> 여러개의 작업을 하나의 단위로 묶어둠 , 작업 중 하나라도 제대로 안되면 작업 전체를 되돌릴 수 있음
});

// 3. 회원 정보 조회
/*
get profile
METHOD : get
url : localhost:3000/user/profile/:id
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 비밀번호를 제외한 유저 정보 
*/
router.get('/profile/:id', (req, res) => {
  // request params에서 데이터 가져오기
  // 존재하는 아이디인지 확인하고 없으면 no user반환
  // 성공 - 로그인 sucess와 함께 유저 ID 반환
});

// 4. 회원 정보 수정
/*
modify profile
METHOD : put
url : localhost:3000/user/profile/:id
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 업데이트 된 유저 하나의 정보
*/
router.put('/profile/:id', (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;
  if (!id || !newName) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }
  const existingUser = users.filter((user) => user.id === Number(id))[0];
  if (!existingUser) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }

  const updateUser = { ...existingUser, name: newName };

  res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.USER_UPDATE_SUCCESS, updateUser));
});

// 5. 회원 정보 삭제
/*
delete profile
METHOD : delete
url : localhost:3000/user/profile/:id
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 유저를 delte한 이후의 유저리스트
*/
router.delete('/profile/:id', (req, res) => {
  // delete는 바디 쓰지 않음
  const { id } = req.params;
  if (!id) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }
  const existingUser = users.filter((user) => user.id === Number(id))[0];
  if (!existingUser) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }
  const newUsers = users.filter((user) => user.id !== Number(id));
  res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.USER_UPDATE_SUCCESS, newUsers));
});

module.exports = router;
