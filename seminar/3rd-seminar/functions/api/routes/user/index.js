const express = require('express');
const router = express.Router();

router.post('/signup', require('./userSignupPOST'));
router.post('/login', require('./userLoginPOST'));
router.delete('/:id', require('./userRemoveDELETE'));
router.put('/:id', require('./userUpdatePUT'));

module.exports = router;
