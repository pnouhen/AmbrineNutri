const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    lastName: {type: String, required: true},
    firstName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role:      { type: String, enum: ['user', 'admin'], default: 'user' }
})

module.exports = mongoose.model("User", userSchema)