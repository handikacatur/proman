const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Project = require('../models/Project');

/**
 * @desc    GET all boards
 * @route   GET /projects/:slug/boards
 * @access  Private
 */
exports.getBoards = asyncHandler(async (req, res, next) => {
    res.status(200).json({hello: 'world'});
});