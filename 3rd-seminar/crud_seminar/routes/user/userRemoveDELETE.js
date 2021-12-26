const responseMessage = require('../../constants/responseMessage');
const statusCode = require('../../constants/statusCode');
const users = require('../../dbMockup/user');
const util = require('../../lib/util');

/*
delete profile
METHOD : delete
url : localhost:3000/user/:id
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 유저를 delte한 이후의 유저리스트
*/
module.exports = async (req, res) => {
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
};
