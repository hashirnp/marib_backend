
const Student = require('../models/student_model')
const User = require('../models/user_model')
const { verifyToken } = require('../utils/utility.function')

const sendResponseError = (statusCode, msg, res) => {
  res.status(statusCode || 400).send({ messege: !!msg ? msg : 'Invalid input !!' })
}

const verifyUser = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    sendResponseError(400, 'You are not authorized no header found', res)
    return
  } else if (!authorization.startsWith('Bearer ')) {
    sendResponseError(400, 'You are not authorized ', res)
    return
  }

  try {
    const payload = await verifyToken(authorization.split(' ')[1])
    if (payload) {

      const user = await Student.findById(payload.id, { password: 0 })

      const students = await Student.find({ 'mobile': user.mobile });

      req['user'] = user
      req['students'] = students
      next();
    } else {
      sendResponseError(400, `you are not authorizeed`, res)
    }
  } catch (err) {
    console.log('Error ', err)
    sendResponseError(400, `Error ${err}`, res)
  }
}





const verifyStaff = async (req, res, next) => {

  const { authorization } = req.headers

  if (!authorization) {
    sendResponseError(400, 'You are not authorized ', res)
    return
  } else if (!authorization.startsWith('Bearer ')) {
    sendResponseError(400, 'You are not authorized ', res)
    return
  }

  try {
    const payload = await verifyToken(authorization.split(' ')[1])

    if (payload) {

      const user = await User.findById(payload.id, { password: 0 })
      if (user.isStaff) {
        req['user'] = user
        next();
      } else {
        sendResponseError(400, `you are not authorizeed to do this action you are student`, res)
      }
      // next()
    } else {
      sendResponseError(400, `you are not authorizeed`, res)
    }
  } catch (err) {
    console.log('Error ', err)
    sendResponseError(400, `Error ${err}`, res)
  }
}

const verifySuperStaff = async (req, res, next) => {

  const { authorization } = req.headers

  if (!authorization) {
    sendResponseError(400, 'You are not authorized ', res)
    return
  } else if (!authorization.startsWith('Bearer ')) {
    sendResponseError(400, 'You are not authorized ', res)
    return
  }

  try {
    const payload = await verifyToken(authorization.split(' ')[1])

    if (payload) {

      const user = await User.findById(payload.id, { password: 0 })
      if (user.isStaff && user.isSuperStaff) {
        req['user'] = user
        next();
      } else {
        sendResponseError(400, `you are not authorizeed to do this action you are not super staff`, res)
      }
      // next()
    } else {
      sendResponseError(400, `you are not authorizeed`, res)
    }
  } catch (err) {
    console.log('Error ', err)
    sendResponseError(400, `Error ${err}`, res)
  }
}

module.exports = {
  sendResponseError,
  verifyUser,
  verifyStaff,
  verifySuperStaff,

}
