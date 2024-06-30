
const express = require('express');
const router = express.Router();
const { sendResponseError,
    verifyUser,
    verifyStaff, } = require('../middleware/auth_middileware')
const {
    getStudents, addAttendance, getAttendance,
    addComplaint, getComplaint, getHolidays,
    getNotifications, getExams, getResult, deleteComplaint,
    addToken,
    getAbsentNotification,
    getFee
} = require('../controller/User/user_controller')

router.get('/', verifyUser, (req, res) => {

    res.status(200).send({ messege: 'user', user: req.user, students: req.students })
})

router.get('/getMyStudents', verifyUser, getStudents)

router.post('/addAttendance', verifyUser, addAttendance)

router.get('/getAttendance', verifyUser, getAttendance)

router.post('/addComplaint', verifyUser, addComplaint);

router.get('/getComplaint', verifyUser, getComplaint);

router.delete('/deleteComplaint', verifyUser, deleteComplaint);

router.get('/getHolidays', verifyUser, getHolidays)

router.get('/getNotifications', verifyUser, getNotifications)

router.get('/getExams', verifyUser, getExams)

router.get('/getResults', verifyUser, getResult)

router.post('/addToken', verifyUser, addToken)

router.get('/getAbsentNotification', verifyUser, getAbsentNotification)

router.get('/getFee', verifyUser, getFee)


module.exports = router;