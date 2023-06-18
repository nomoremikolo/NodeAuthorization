const {Schema, model} = require("mongoose")

const tokenSchema = new Schema({
    refreshToken: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
    },
})

module.exports = model('Token', tokenSchema)