const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Board = require('../models/Board');
const Project = require('../models/Project');

/**
 * @desc    GET all boards
 * @route   GET /projects/:slug/boards
 * @access  Private
 */
exports.getBoards = asyncHandler(async (req, res, next) => {
    const projectId = await Project.findOne({slug: req.params.slug});
    const boards = await Board.find({project: projectId._id});

    if (boards.length === 0) {
        return next(new ErrorResponse('No board found', 404));
    }

    res.status(200).json({
        success: true,
        data: boards
    });
});

/**
 * @desc    GET a single board
 * @route   GET /projects/:slug/boards/:id
 * @access  Private
 */
exports.getBoard = asyncHandler(async (req, res, next) => {
    const board = await Board.findById(req.params.id);

    if (!board) {
        return next(new ErrorResponse(`Board with id ${req.params.id} not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: board
    });
});

/**
 * @desc    Create board
 * @route   POST /projects/:slug/boards
 * @access  Private
 */
exports.createBoard = asyncHandler(async (req, res, next) => {
    // check if board is already added
    const checkBoard = await Board.findOne({name: req.body.name});

    if (checkBoard) {
        return next(new ErrorResponse(`Board with name ${req.body.name} already added`, 400));
    }

    const projectId = await Project.findOne({slug: req.params.slug});

    req.body.project = projectId._id;

    const board = await Board.create(req.body);

    res.status(201).json({
        success: true,
        data: board
    });
});

/**
 * @desc    Update board
 * @route   PUT /projects/:slug/boards/:id
 * @access  Private
 */
exports.updateBoard = asyncHandler(async (req, res, next) => {
    let board = await Board.findById(req.params.id);

    if (!board) {
        return next(new ErrorResponse(`Board with id ${req.params.id}`, 404));
    }

    board = await Board.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(201).json({
        success: true,
        data: board
    });
});

/**
 * @desc    Delete board
 * @route   DELETE /projects/:slug/boards/:id
 * @access  Private
 */
exports.deleteBoard = asyncHandler(async (req, res, next) => {
    const board = await Board.findById(req.params.id);

    if (!board) {
        return next(new ErrorResponse(`Board with id ${req.params.id} is not found`, 404));
    }

    await board.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});