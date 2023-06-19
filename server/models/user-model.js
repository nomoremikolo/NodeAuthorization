const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    phone: {
        type: String,
        unique: true, 
        require: true,
    },
    email: {
        type: String, 
        unique: true, 
        require: true,
    },
    password: {
        type: String, 
        require: true,
    },
    permissions: {
        type: [String], 
        require: false, 
        default: [],
    },
})

module.exports = model('User', userSchema)