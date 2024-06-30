const Attendance = require('../../models/attendance_model')
const { ObjectId } = require('mongodb'); // or ObjectID 
const AbsentNotification = require('../../models/absent_notification');
const Complaint = require('../../models/complaint_model');
const ResultModel = require('../../models/result_model');
const ExamModel = require('../../models/exam_model');
const FeePayment = require('../../models/fees_model');
const StudentModel = require('../../models/student_model')


const getAttendance = async (req, res) => {
    try {
        let query = (req.query);
        query['studentClass'] = req.user.userClass
        let data = await Attendance.find(query).populate('studentId')
        res.status(200).send({ data: data, length: data.length })
    } catch (error) {
        res.status(400).send({ message: error })
    }
}

const updateAttendance = async (req, res) => {
    try {
        let list = req.body['data'];
        for (const element of list) {

            await Attendance.updateOne({ '_id': element['_id'] }, element)
            /** 
             * if present is true and verified is false done
             * send notificaiton to parent also store absent notification  
            */
            if (element['present'] && !element['verified']) {
                let attendence = await Attendance.findOne({ '_id': element['_id'], date: element['date'] })
                // console.log(element['studentId']['_id']);
                // await addAbsentNotificaiton(attendence['studentId'].toString(), element['date'])
            }
        }
        res.status(200).send({ message: "Attendance Updated" })

    } catch (error) {
        res.status(400).send({ message: error })
    }
}

async function addAbsentNotificaiton(stduentID, date) {
    try {
        let student = await StudentModel.findOne({ '_id': stduentID })
        var notificaitonObject = {
            studentId: stduentID,
            text: `${student.name} is Absent Today`,
            date: date,
        }

        await AbsentNotification.create(notificaitonObject)

        // TODO - send push notification to parent's device

    } catch (error) {
        console.log(error);
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
        let complaint = req.body;
        // console.log();
        await Complaint.updateOne({ '_id': complaint['_id'] }, complaint)
        let newData = await Complaint.findOne({ '_id': complaint['_id'] })
        res.status(200).send({ message: 'Complaint Status Updated', data: newData })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const addResult = async (req, res) => {
    // console.log(req.body);
    let list = req.body;
    let newError;
    for (const element of list) {
        try {
            let isExist = await ResultModel.findOne({ studentID: element.studentID._id, examID: element.examID._id })
            if (isExist) {
                const studentID = element.studentID._id;
                const examID = element.examID._id;
                await ResultModel.findOneAndUpdate({ studentID, examID }, element);
            } else {
                await ResultModel.create(element);
            }


        } catch (error) {
            newError = error;
        }
    }
    if (newError != null) {
        res.status(400).send({ message: newError })

    } else {
        let result = await ResultModel.findOne({ studentClass: req.user.userClass }).populate('studentID').populate('examID');
        res.status(200).send({ message: 'Result Added', data: result, length: result.length })
    }


}

// const addResult = async (req, res) => {
//     try {
//         await ResultModel.create(req.body);
//         let result = await ResultModel.findOne({ studentClass: req.user.userClass })
//             .populate('studentID')
//             .populate('examID');
//         res.status(200).send({ message: 'Result Added', data: result, length: result.length });
//     } catch (error) {
//         if (error.code === 11000) { // Duplicate key error code
//             // Assuming 'studentID' and 'examID' are part of the unique key
//             const { studentID, examID, score } = req.body;
//             console.log(studentID);

//             try {
//                 await ResultModel.findOneAndUpdate(
//                     { studentID, examID }, // Find document with same studentID and examID
//                     { score }, // Update the score
//                     { new: true, upsert: true } // Options: return the updated document
//                 );
//                 let result = await ResultModel.findOne({ studentClass: req.user.userClass })
//                     .populate('studentID')
//                     .populate('examID');

//                     console.log("updated");
//                 res.status(200).send({ message: 'Result Updated', data: result, length: result.length });
//             } catch (updateError) {
//                 console.log(updateError);
//                 res.status(500).send({ message: 'Error updating the result', error: updateError });
//             }
//         } else {
//             console.log(error);
//             res.status(400).send({ message: error.message });
//         }
//     }
// };


const getResult = async (req, res) => {
    try {

        let data = await ResultModel.find({ studentClass: req.user.userClass, examID: req.query.examID }).populate('studentID').populate('examID');
        res.status(200).send({ data: data, length: data.length })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const updateResult = async (req, res) => {
    try {
        let updatedResult = req.body;
        // console.log();
        await ResultModel.updateOne({ '_id': updatedResult['_id'] }, updatedResult)
        let newData = await ResultModel.findOne({ '_id': updatedResult['_id'] })
        res.status(200).send({ message: 'Result Updated', data: newData })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const deleteResult = async (req, res) => {
    try {
        await ResultModel.deleteOne({ '_id': req.params.id },)
        res.status(200).send({ message: 'Result Deleted' })
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





const getStudents = async (req, res) => {
    try {
        let data = await StudentModel.find({ studentClass: req.user.userClass })
        res.status(200).send({ data: data, length: data.length })

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const addAbsentNotification = async (req, res) => {
    try {

        await AbsentNotification.create(req.body);
        let data = await AbsentNotification.find()
        res.status(200).send({ message: 'Absent Notificaiton Added', data: data, length: data.length })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}

const getAbsentNotification = async (req, res) => {
    try {

        let data = await AbsentNotification.find(req.query).populate('studentId');

        console.log(data.length);
        res.status(200).send({ data: data, length: data.length })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}


const deleteAbsentNotification = async (req, res) => {
    console.log("called");
    console.log(req.params.id);
    try {
        await AbsentNotification.deleteOne({ '_id': req.params.id },)
        res.status(200).send({ message: 'Notificaiton Deleted' })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }
}


module.exports = {
    getAttendance, updateAttendance, getComplaints, updateComplaint,
    addResult, getResult, updateResult, deleteResult,
    getExams,
    getStudents,
    addAbsentNotification, getAbsentNotification, deleteAbsentNotification

}