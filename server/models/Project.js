const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a project name'],
        trim: true,
        maxLength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxLength: [500, 'Description can not be more than 500 characters']
    },
    createAt: Date.now
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

// Reverse populate with boards that associated with a project
ProjectSchema.virtual('boards', {
    ref: 'Board',
    localField: '_id',
    foreignField: 'bootcamp',
    justOne: false
});

module.exports = mongoose.model('Project', ProjectSchema);