const User = require('../../models/user_model')
// const errorHandler = require('../middleware/errorHandler')
const { sendResponseError } = require('../../middleware/auth_middileware')
const OTPModel = require('../../models/otp_model')
const { checkPassword, newToken } = require('../../utils/utility.function')
const Student = require('../../models/student_model')
const crypto = require('crypto');
const bcrypt = require('bcryptjs');



const findUser = async (req, res) => {

    const { mobile, password } = req.body
    // console.log(`${mobile}\n${password}`);
    const encryptedPassword = decryptPassword(password);
    console.log(encryptedPassword);
    try {
        const users = await User.find({ mobile: mobile  })
        console.log(users.length);
        if (!!!users) {
            sendResponseError(400, 'User Not Found', res)
        } else {
            let user;
            for (let index = 0; index < users.length; index++) {
                const element = users[index];

                const temp = element.name[0].toUpperCase() + element.name.substring(1, 4).toLowerCase() + element.mobile.toString().substring(9)
                console.log(temp);
                if (temp == encryptedPassword) {
                    user = element;
                    break;
                }

            }
            // console.log(student);
            if (user) {

                let token = newToken(user)
                res.status(200).json({
                    messege: 'Logged In',
                    user: user,
                    token: token,
                })
            } else {
                res.status(401).json({ message: 'Admin Not Found' })
            }

            
        }

        


    } catch (error) {
        console.log(error)
    }
    // res.send({ messege: 'all ok' })

}

const verifyOTP = async (req, res) => {

    const { otp, mobile } = req.body
    try {
        var isAvailable = await OTPModel.findOne({ otp });
        if (isAvailable) {

            await OTPModel.deleteOne({ otp })
            const user = await User.findOne({ mobile: { $gte: mobile } })

            let token = newToken(user)


            res.status(200).json({
                messege: 'OTP Verified',
                user: user,
                token: token,
            })

        } else {
            res.status(401).json({ messege: 'Invalid OTP' })
        }


    } catch (error) {
        console.log(error)
    }
}


const findStudent = async (req, res) => {

    const { mobile, password } = req.body
    // console.log(`${mobile}\n${password}`);
    const encryptedPassword = decryptPassword(password);
    console.log(encryptedPassword);
    try {
        const students = await Student.find({ mobile: mobile  })
        console.log(students.length);
        if (!!!students) {
            sendResponseError(400, 'Student Not Found', res)
        } else {
            let student;
            console.log(student);
            for (let index = 0; index < students.length; index++) {
                const element = students[index];

                const temp = element.name[0].toUpperCase() + element.name.substring(1, 4).toLowerCase() + element.mobile.toString().substring(9)
                if (temp == encryptedPassword) {
                    student = element;
                    break;
                }

            }
            // console.log(student);
            if (student) {

                let token = newToken(student)
                res.status(200).json({
                    messege: 'Logged In',
                    user: student,
                    token: token,
                })
            } else {
                res.status(401).json({ message: 'Student Not Found' })
            }

            // var isAvailable = await OTPModel.findOne({ mobile: { $gte: mobile } });
            // if (isAvailable === null) {
            //     var otp = generateOTP();
            //     // await sendMessege(mobile, `OTP generated for Login ${otp} - This OTP only valid for 5 Minutes`)
            //     // await sendSMS(mobile,`OTP generated for Login ${otp} - This OTP only valid for 5 Minutes`)
            //     await OTPModel.create({ mobile, otp });

            //     res.json({ messege: 'OTP Send succesfully' })
            // } else {
            //     // await sendMessege(mobile, `OTP generated for Login ${isAvailable.otp} - This OTP only valid for 150 Seconds`)
            //     res.json({ messege: 'OTP Send succesfully' })
            // }
        }

        // var otp = generateOTP();

        // await sendMessege(mobile, `OTP generated for Login ${otp} - This OTP only valid for 5 Minutes`)
        // // await sendSMS(mobile,`OTP generated for Login ${otp} - This OTP only valid for 5 Minutes`)
        // await OTPModel.create({ mobile, otp });

        // res.json({ messege: 'OTP Send succesfully' })


    } catch (error) {
        console.log(error)
    }
    // res.send({ messege: 'all ok' })
}

const verifyStudentOTP = async (req, res) => {

    const { otp, mobile } = req.body
    try {
        var isAvailable = await OTPModel.findOne({ otp });
        if (isAvailable) {

            await OTPModel.deleteOne({ otp })
            const user = await Student.findOne({ mobile: { $gte: mobile } })

            let token = newToken(user)


            res.status(200).json({
                messege: 'OTP Verified',
                user: user,
                token: token,
            })

        } else {
            res.status(401).json({ messege: 'Invalid OTP' })
        }


    } catch (error) {
        console.log(error)
    }
}



const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();

}

function decryptPassword(encryptedPassword) {
    try {
        const key = Buffer.from('12345678901234567890123456789012');
        const iv = Buffer.from('1234567890123456');

        let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(encryptedPassword, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
}

module.exports = { findUser, verifyOTP, verifyStudentOTP, findStudent }
