const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        date_joined:{
            type:Date,
            default:Date.now
        }
    }
);
module.exports = mongoose.model('User', userSchema);