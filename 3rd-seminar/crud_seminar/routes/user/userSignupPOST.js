const responseMessage = require('../../constants/responseMessage');
const statusCode = require('../../constants/statusCode');
const users = require('../../dbMockup/user');
const util = require('../../lib/util');

/* 

sign up
METHOD : POST
URI : localhost:3000/user/signup
REQUEST BODY : id, name, password, email
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : All User Data

*/
module.exports = async (req, res) => {
  //   const something = req.query;
  //   const something = req.params;
  const { id, name, password, email } = req.body;

  // request data 확인 - 네 개 중 하나라도 없다면 Bad Request 반환
  if (!id || !name || !password || !email) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(400, responseMessage.BAD_REQUEST));
  }

  //   받은 정보가 중복될 때
  const alreadyUser = users.filter((user) => user.email === email).length > 0;
  if (alreadyUser) {
    return res.status(statusCode.ALREADY_EXIST).send(util.fail(statusCode.ALREADY_EXIST, responseMessage.ALREADY_EMAIL));
  }
  const newUser = { id, name, password, email };

  users.push(newUser);

  res.status(statusCode.OK).send(util.success(200, responseMessage.CREATED_USER, newUser));
};
