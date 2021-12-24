const express = require('express');
const { checkUser } = require('../../../middlewares/auth');
const router = express.Router();

const uploadImage = require('../../../middlewares/uploadImage');

router.get('/list', require('./postListGET'));

router.post('/', uploadImage, require('./postPOST'));
// checkUser 미들웨어를 통해서 next함수로 넘어감!
// 이 라우터도 미들웨어 이지만 미들웨어 안에서 하나의 체크 과정을 더 거침
router.get('/:postId', checkUser, require('./postGET'));
router.put('/:postId', require('./postPUT'));
router.delete('/:postId', require('./postDELETE'));

module.exports = router;
