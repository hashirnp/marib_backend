const User = require('../../models/user_model')
const Attendance = require('../../models/attendance_model')
const Complaint = require('../../models/complaint_model')
const HolidayModel = require('../../models/holiday_model')
const EventNotificationModel = require('../../models/notification_model')
const Student = require('../../models/student_model')
const ExamModel = require('../../models/exam_model')
const ResultModel = require('../../models/result_model')
const AbsentNotification = require('../../models/absent_notification')
const FeePayment=require('../../models/fees_model')

const getStudents = async (req, res) => {
    try {
        if (req.user) {
            var mobile = req.user['mobile']
            var list = await Student.find({ mobile: mobile });
            res.send({ length: list.length, data: list, })
        } else {
            res.status(500).json({ error: `error` });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `${error}` });
    }
}

const addAttendance = async (req, res) => {

    const attendances = req.body; // Extract the list of attendance from the request body
    console.log(attendances)
    let newError;

    // Insert multiple attendance records into the database
    for (const attendance of attendances) {
        try {
            if (await Attendance.findOne({ studentId: attendance['studentId']['_id'], date: attendance['date'] })) {
                await Attendance.updateOne({ studentId: attendance['studentId']['_id'], date: attendance['date'] }, {
                    date: attendance['date'],
                    present: attendance['present'],
                    verified: attendance['verified'],
                    studentId: attendance['studentId']['_id'],
                    studentClass: attendance['studentClass'],
                    month: attendance['month'],
                    timestamp: attendance['timestamp'],
                })
            } else {
                await Attendance.create(attendance)
            }
        } catch (error) {
            newError = error;

        }
    }

    if (newError != null) {
        res.status(400).send({ message: newError })

    } else {
        res.status(200).send({ message: 'Attendance Added', })
    }

}


const getAttendance = async (req, res) => {
    // let data=
    try {
        let query = (req.query);
        query['studentClass'] = req.user.studentClass

        let data = await Attendance.find(query).populate('studentId');
        res.json({ data: data, length: data.length })
    } catch (error) {
        res.status(400).send({ messege: error })

    }
}


const addComplaint = async (req, res) => {
    try {
        await Complaint.create(req.body)
        res.status(200).send({ messege: 'Added ' });
    } catch (error) {
        res.status(400).send({ messege: error })
    }
}


const getComplaint = async (req, res) => {
    // let data=
    try {
        let query = (req.query);
        let data = await Complaint.find(query).populate('studentId',);
        res.json({ data: data, length: data.length })
    } catch (error) {
        res.status(400).send({ messege: error })

    }
}


const deleteComplaint = async (req, res) => {
    // let data=
    try {
        let query = (req.query);
        let id = query['id'];
        let studentID = query['studentId'];
        await Complaint.deleteOne({ '_id': id })
        let data = await Complaint.find({ studentId: studentID });
        res.json({ data: data, length: data.length })
    } catch (error) {
        res.status(400).send({ messege: error })

    }
}

const getHolidays = async (req, res) => {
    // let data=
    try {
        let query = (req.query);
        let data = await HolidayModel.find(query);
        res.json({ data: data, length: data.length })
    } catch (error) {
        res.status(400).send({ messege: error })
    }
}


const getExams = async (req, res) => {
    try {
        let data = await ExamModel.find(req.query);
        res.status(200).send({ data: data, length: data.length })
    } catch (error) {
        res.status(400).send({ messege: error })

    }
}

const getResult = async (req, res) => {
    try {
        let data = await ResultModel.find(req.query).populate('studentID').populate('examID');
        console.log(data);
        res.status(200).send({ data: data, length: data.length })
    } catch (error) {
        res.status(400).send({ messege: error })
    }
}


const getNotifications = async (req, res) => {
    // let data=
    try {
        let query = (req.query);
        let data = await EventNotificationModel.find(query);
        res.json({ data: data, length: data.length })
    } catch (error) {
        res.status(400).send({ messege: error })

    }
}

const addToken=async(req,res)=>{
    
    try {
        await Student.updateMany({ mobile: req.user.mobile }, { token: req.body.token })
    } catch (error) {
        res.status(400).send({ messege: error })
    }
}

const getAbsentNotification = async (req, res) => {
    try {
        let query = (req.query);
        let data = await AbsentNotification.find(query);
        res.json({ data: data, length: data.length })
    } catch (error) {
        res.status(400).send({ messege: error })

    }
}

const getFee = async (req, res) => {
    try {
        let data = await FeePayment.find(req.query).populate('studentId');
        res.status(200).send({ data: data, length: data.length })
    } catch (error) {
        res.status(400).send({ message: error })
    }
}

module.exports = {
    getStudents, addAttendance, getAttendance,
    addComplaint, getComplaint, getHolidays,
    getNotifications, getExams, getResult, deleteComplaint,
    addToken,
    getAbsentNotification,
    getFee
}