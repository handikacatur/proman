const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: [20, 'List name can not be more than 20 characters'],
        required: true
    },
    position: {
        type: Number
    },
    board: {
        type: mongoose.Schema.ObjectId,
        ref: 'Board',
        required: true
    }
});

module.exports = mongoose.model('List', ListSchema);