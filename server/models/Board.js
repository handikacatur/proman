const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a board name'],
        trim: true,
        maxLength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project',
        required: true
    },
    createAt: Date.now
});

module.exports = mongoose.model('Project', BoardSchema);