const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    phoneNo: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (value.length != 10) {
                throw new Error(`Phone Number is Invalid, Length: ${value.length}`);
            }
        }

    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    groupId: {
        type: String,
    }

})

const User = mongoose.model('User', userSchema);
module.exports = User;