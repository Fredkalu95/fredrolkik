const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    fullname: {type: String, required: true, unique: true, default: ''},
    email: {type: String, required: true, unique: true},
    password: {type: String, default: ''},
    userImage: {type: String, default:"default.png"},
    facebook: {type: String, default: ''},	
    fbToken: Array,
    google: {type: String, default: ''},
    googleToken: Array,
})

module.exports = mongoose.model('User', userSchema)