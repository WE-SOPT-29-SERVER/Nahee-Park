const util = require('../../../lib/util.js');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const users = require('../../../dbMockup/user');

/*
modify profile
METHOD : put
url : localhost:5001/user/:id
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 업데이트 된 유저 하나의 정보
*/

module.exports = async (req, res) => {
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
};
