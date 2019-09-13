const mongoose = require('mongoose');
const validator = require('validator');

const groupSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    groupIds: [{
        groupId: {
            type: String,
            required: true,
        }
    }]

})

const Group = mongoose.model('group', groupSchema);
module.exports = Group;