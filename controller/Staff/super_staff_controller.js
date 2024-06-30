const EventNotificationModel = require("../../models/notification_model");
const ExamModel = require("../../models/exam_model");
const { ObjectId } = require('mongodb'); // or ObjectID 
const Complaint = require("../../models/complaint_model");
const HolidayModel = require("../../models/holiday_model");
const UserModel = require("../../models/user_model");
const StudentModel = require('../../models/student_model')
const FeePayment = require('../../models/fees_model')

const getNotifications = async (req, res) => {
    try {
        let data = await EventNotificationModel.find(req.query);
        res.status(200).send({ data: data, length: data.length })
    } catch (error) {
        res.status(400).send({ message: error })
    }
}

const addNotification = async (req, res) => {
    console.log("called");
    try {
        await EventNotificationModel.create(req.body)
        let data = await EventNotificationModel.find();
        res.status(200).send({ message: 'Notificaiton Added', data: data })
    } catch (error) {
        res.status(400).send({ message: error })
    }
}

const updateNotification = async (req, res) => {

    try {
        let updatedNotifcation = req.body;
        // console.log();
        await EventNotificationModel.updateOne({ '_id': updatedNotifcation['_id'] }, updatedNotifcation)
        let newData = await EventNotificationModel.findOne({ '_id': updatedNotifcation['_id'] })
        res.status(200).send({ message: 'Notificaiton Updated', data: newData })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const deleteNotification = async (req, res) => {

    console.log(req.params.id);
    try {

        await EventNotificationModel.deleteOne({ '_id': req.params.id },)
        res.status(200).send({ message: 'Notification Deleted' })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const getExams = async (req, res) => {
    try {
        let data = await ExamModel.find(req.query);
        res.status(200).send({ data: data, length: data.length })
    } catch (error) {
        res.status(400).send({ message: error })
    }
}

const addExam = async (req, res) => {

    try {
        await ExamModel.create(req.body)
        res.status(200).send({ message: 'Exam Added' })
    } catch (error) {
        res.status(400).send({ message: error })
    }
}

const updateExam = async (req, res) => {

    try {
        let updatedExam = req.body;
        await ExamModel.updateOne({ '_id': updatedExam['_id'] }, updatedExam)

        let newData = await ExamModel.find(req.query);

        res.status(200).send({ message: 'Exam Updated', data: newData })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const deleteExam = async (req, res) => {

    console.log(req.params.id);
    try {

        await ExamModel.deleteOne({ '_id': req.params.id },)
        // let newData = await ExamModel.find(req.query);
        res.status(200).send({ message: 'Exam Deleted', })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const getHolidays = async (req, res) => {
    try {
        let data = await HolidayModel.find(req.query);
        res.status(200).send({ data: data, length: data.length })
    } catch (error) {
        res.status(400).send({ message: error })
    }
}

const addHoliday = async (req, res) => {
    try {
        const { startDate, endDate, reason } = req.body;
        const temp = new Date(parseInt(endDate)); // Set expireAt to one day after endDate
        const result = temp.setDate(temp.getDate() + 1)
        const expireAt = new Date(result);
        console.log(expireAt);
        const holiday = new HolidayModel({
            startDate,
            endDate,
            reason,
            expireAt: expireAt
        });

        await holiday.save();
        res.status(200).send({ message: 'Holiday Added' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const updateHoliday = async (req, res) => {

    try {
        let updatedExam = req.body;
        // console.log();
        await HolidayModel.updateOne({ '_id': updatedExam['_id'] }, updatedExam)


        let newData = await HolidayModel.findOne({ '_id': updatedExam['_id'] });

        res.status(200).send({ message: 'Holiday Updated', data: newData })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const deleteHoliday = async (req, res) => {

    console.log(req.params.id);
    try {

        await HolidayModel.deleteOne({ '_id': req.params.id },)
        res.status(200).send({ message: 'Holiday Deleted' })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const getComplaints = async (req, res) => {
    try {
        let data = await Complaint.find(req.query).populate('studentId')
        res.status(200).send({ data, length: data.length })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const updateComplaint = async (req, res) => {

    try {
        let updatedExam = req.body;
        // console.log();
        await Complaint.updateOne({ '_id': updatedExam['_id'] }, updatedExam)


        let data = await Complaint.find(req.query).populate('studentId')

        res.status(200).send({ data, length: data.length, message: 'Complaint Updated' })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const addEvent = async (req, res) => {


    try {
        await EventNotificationModel.create(req.body);
        res.status(200).send({ message: 'Event Added' })
    } catch (error) {
        res.status(400).send({ message: error })
    }
}


const addStaff = async (req, res) => {
    try {
        console.log(req.body);
        await UserModel.create(req.body);
        let data = await UserModel.find({ isStaff: true })
        res.status(200).send({ message: 'Staff Added', data: data, length: data.length })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const getStaffs = async (req, res) => {
    try {
        let data = await UserModel.find({ isStaff: true })
        res.status(200).send({ data, length: data.length })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}


const updateStaff = async (req, res) => {

    try {
        let updatedExam = req.body;
        await UserModel.updateOne({ '_id': updatedExam['_id'] }, updatedExam)
        let data = await UserModel.find({ isStaff: true })
        res.status(200).send({ data, length: data.length, message: 'Complaint Updated' })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const deleteStaff = async (req, res) => {
    try {


        await UserModel.deleteOne({ '_id': req.params.id })
        let data = await UserModel.find({ isStaff: true })
        res.status(200).send({ message: 'Staff Deleted', data: data, length: data.length })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}


const addStudent = async (req, res) => {
    try {

        await StudentModel.create(req.body);
        let data = await StudentModel.find()
        res.status(200).send({ message: 'Student Added', data: data, length: data.length })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const getStudents = async (req, res) => {
    console.log(req.query);
    try {
        let data = await StudentModel.find(req.query)
        res.status(200).send({ data, length: data.length })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}


const updateStudent = async (req, res) => {

    try {
        let newStudent = req.body;
        await StudentModel.updateOne({ '_id': newStudent['_id'] }, newStudent)
        let data = await StudentModel.find()
        res.status(200).send({ data, length: data.length, message: 'Complaint Updated' })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const deleteStudent = async (req, res) => {
    try {
        await StudentModel.deleteOne({ '_id': req.params.id })
        let data = await StudentModel.find()

        res.status(200).send({ message: 'Student Deleted', data: data, length: data.length })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const addFee = async (req, res) => {
    console.log(req.body)
    try {
        await FeePayment.create(req.body);
        res.status(200).send({ message: 'Fee Added' })
    } catch (error) {
        res.status(400).send({ message: error })
    }
}

const getFee = async (req, res) => {
    try {
        let data = await FeePayment.find(req.query).populate('studentId').populate('teacherId');
        res.status(200).send({ data: data, length: data.length })
    } catch (error) {
        res.status(400).send({ message: error })
    }
}

const updateFee = async (req, res) => {
    try {
        let updatedResult = req.body;
        // console.log();
        await FeePayment.updateOne({ '_id': updatedResult['_id'] }, updatedResult)
        let newData = await FeePayment.findOne({ '_id': updatedResult['_id'] })
        res.status(200).send({ message: 'Fee Updated', data: newData })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const deleteFee = async (req, res) => {
    try {
        await FeePayment.deleteOne({ '_id': req.params.id },)
        res.status(200).send({ message: 'Fee Deleted' })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}


module.exports = {
    addNotification, getNotifications, updateNotification, deleteNotification,
    addExam, getExams, updateExam, deleteExam,
    addHoliday, getHolidays, updateHoliday, deleteHoliday,
    getComplaints, updateComplaint, addEvent,
    getStaffs, updateStaff, addStaff, deleteStaff,
    getStudents, updateStudent, addStudent, deleteStudent,
    addFee, getFee, updateFee, deleteFee,
}