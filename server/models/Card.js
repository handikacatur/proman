const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    position: Number,
    description: String,
    list: {
        type: mongoose.Schema.ObjectId,
        ref: 'List',
        required: true
    }
});

module.exports = mongoose.model('Card', CardSchema);