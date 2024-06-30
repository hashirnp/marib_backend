
const express = require('express');
const router = express.Router();
const {findUser,verifyOTP,verifyStudentOTP,findStudent} =require('../controller/Auth/auth_controller')

router.post('/login',findUser);
router.post('/verify',verifyOTP);

router.post('/user/login',findStudent);
router.post('/user/verify',verifyStudentOTP)


module.exports=router;