const express = require('express');
const router = express.Router();
const { sendResponseError,
    verifyUser,
    verifyStaff, } = require('../middleware/auth_middileware')
const { getAttendance, updateAttendance, getComplaints, updateComplaint,
    addResult, getResult, updateResult, deleteResult,
    getExams,
    getStudents,
    addAbsentNotification, getAbsentNotification, deleteAbsentNotification } = require('../controller/Staff/staff_controller');
const { version } = require('mongoose');

router.get('/', verifyStaff, (req, res) => {
    res.send({ user: req.user });
});

router.get('/getStudents', verifyStaff, getStudents)

router.get('/getAttendance', verifyStaff, getAttendance)

router.put('/updateAttendance', verifyStaff, updateAttendance)

router.get('/getComplaints', verifyStaff, getComplaints)

router.put('/updateComplaint', verifyStaff, updateComplaint)

router.get('/getResult', verifyStaff, getResult)

router.post('/addResult', verifyStaff, addResult)

router.put('/updateResult', verifyStaff, updateResult)

router.delete('/deleteResult/:id', verifyStaff, deleteResult)

router.get('/getExams', verifyStaff, getExams)

router.post('/addAbsentNotification', verifyStaff, addAbsentNotification)

router.get('/getAbsentNotification', verifyStaff, getAbsentNotification)

router.delete('/deleteAbsentNotification/:id', verifyStaff, deleteAbsentNotification)

module.exports = router;