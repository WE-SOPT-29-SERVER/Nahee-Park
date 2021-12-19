const responseMessage = require('../../constants/responseMessage');
const statusCode = require('../../constants/statuscode');
const users = require('../../dbMockup/user');
const util = require('../../lib/util');

/*
login
METHOD : post
url : localhost:3000/user/login
REQUEST BODY : id, password
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 비밀번호를 제외한 유저 정보 
*/
module.exports = async (req,res) => {
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
}