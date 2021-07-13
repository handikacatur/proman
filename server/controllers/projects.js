const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

/**
 * @desc    GET all projects
 * @route   GET /projects
 * @access  Private
 */
exports.getProjects = async (req, res, next) => {
    res.status(200).json({
        hello: 'world'
    });
};

/**
 * @desc    GET single project
 * @route   GET /projects/:name
 * @access  Private
 */
exports.getProject = asyncHandler( async (req, res, next) => {
    if (req.params.name === 'hello') {
        return next(new ErrorResponse(`Project with name ${req.params.name} is not found`, 404));
    }

    res.status(200).json({hello: 'world'});
});