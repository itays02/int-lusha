const { User } = require("../models/user.model");
const fieldsToReturn = 'firstName lastName email description'

const isEmailExists = async email => await User.findOne({ email }) !== null

const findAllUsers = (start) => {
  const USERS_IN_PAGE = 15
  const users = start >= 0 ?
    User.find({}, fieldsToReturn, {skip: start, limit: USERS_IN_PAGE, sort: {createdAt: -1}}) :
    User.find({}, fieldsToReturn).sort({createdAt: -1})

  return users
}

const createUser = async (userData) => {
  try {
    const newUser = new User ({...userData, createdAt: new Date()})
    await newUser.save()
  } catch (err) {
    console.log('error in creating new user', err)
    throw new Error('error in creating new user')
  }
}

module.exports = {
  isEmailExists, findAllUsers, createUser
}
