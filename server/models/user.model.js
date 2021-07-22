const mongoose = require('mongoose')
const {hashPassword} = require("../services/util");

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: { type : String, required : true },
    lastName: { type : String, required : true },
    email: { type : String , unique : true, required : true },
    password: { type : String, required : true },
    description: { type : String, required : true },
    createdAt: { type : Date, required : true }
});

UserSchema.pre('save', function(next) {
    const user = this;
    hashPassword(user.password).then(hash => {
        user.password = hash
        next()
    }).catch(err => {
        console.log('Error during hashing password', err)
    })
})

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
}

