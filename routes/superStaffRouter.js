const express = require('express');
const router = express.Router();
const { sendResponseError,
    verifyUser,
    verifyStaff, verifySuperStaff } = require('../middleware/auth_middileware')

const { addNotification, getNotifications, updateNotification, deleteNotification,
    addExam, getExams, updateExam, deleteExam,
    addHoliday, getHolidays, updateHoliday, deleteHoliday,
    getComplaints, updateComplaint,
    addEvent, getStaffs, updateStaff, addStaff, deleteStaff,
    getStudents, updateStudent, addStudent, deleteStudent,
    addFee, updateFee, getFee, deleteFee, 



} = require('../controller/Staff/super_staff_controller')



router.get('/', verifySuperStaff, (req, res) => {

    res.send({ user: req.user });
});

router.get('/getNotifications', verifySuperStaff, getNotifications)

router.post('/addNotification', verifySuperStaff, addNotification)

router.put('/updateNotification', verifySuperStaff, updateNotification)

router.delete('/deleteNotification/:id', verifySuperStaff, deleteNotification)


router.get('/getExams', verifySuperStaff, getExams)

router.post('/addExam', verifySuperStaff, addExam)

router.put('/updateExam', verifySuperStaff, updateExam)

router.delete('/deleteExam/:id', verifySuperStaff, deleteExam)

router.get('/getHolidays', verifySuperStaff, getHolidays)

router.post('/addHoliday', verifySuperStaff, addHoliday)

router.put('/updateHoliday', verifySuperStaff, updateHoliday)

router.delete('/deleteHoliday/:id', verifySuperStaff, deleteHoliday)

router.get('/getComplaints', verifySuperStaff, getComplaints)

router.put('/updateComplaint', verifySuperStaff, updateComplaint)

router.post('/addEvent', verifySuperStaff, addEvent)

router.get('/getStaffs', verifySuperStaff, getStaffs);

router.post('/addStaff', verifySuperStaff, addStaff);

router.put('/updateStaff', verifySuperStaff, updateStaff);

router.delete('/deleteStaff/:id', verifySuperStaff, deleteStaff)

router.get('/getStudents', verifySuperStaff, getStudents);

router.post('/addStudent', verifySuperStaff, addStudent);

router.put('/updateStudent', verifySuperStaff, updateStudent);

router.delete('/deleteStudent/:id', verifySuperStaff, deleteStudent);

router.get('/getFee', verifySuperStaff, getFee);

router.post('/addFee', verifySuperStaff, addFee);

router.put('/updateFee', verifySuperStaff, updateFee);

router.delete('/deleteFee/:id', verifySuperStaff, deleteFee);

module.exports = router;