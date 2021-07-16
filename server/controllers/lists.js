const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const List = require('../models/List');
const Board = require('../models/Board');

/**
 * @desc    GET all Lists
 * @route   GET /projects/:slug/boards/:id/lists
 * @access  Private
 */
exports.getLists = asyncHandler(async (req, res, next) => {
    const lists = await List.find();
    const boardId = await Board.findById(req.params.id);

    if (lists.length === 0) {
        return next(new ErrorResponse('No list found', 404));
    }

    if (!boardId) {
        return next(new ErrorResponse(`No board with id ${req.params.id} found`, 404));
    }

    res.status(200).json({
        success: true,
        data: lists
    });
});

/**
 * @desc    Create Lists
 * @route   POST /projects/:slug/boards/:id/lists
 * @access  Private
 */
exports.createList = asyncHandler(async (req, res, next) => {
    // check board id
    const boardId = await Board.findById(req.params.id);

    if (!boardId) {
        return next(new ErrorResponse(`No board with id ${req.params.id} found`, 404));
    }

    req.body.board = req.params.id;

    const list = await List.create(req.body);

    res.status(201).json({
        success: true,
        data: list
    });
});

/**
 * @desc    Update Lists
 * @route   PUT /projects/:slug/boards/:id/lists/:listId
 * @access  Private
 */
exports.updateList = asyncHandler(async (req, res, next) => {
    const boardId = await Board.findById(req.params.id);
    let list = await List.findById(req.params.listId);

    if (!boardId) {
        return next(new ErrorResponse(`No board with id ${req.params.id} found`, 404));
    }

    if (!list) {
        return next(new ErrorResponse(`No list with id ${req.params.listId} found`, 404));
    }

    list = await List.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(201).json({
        success: true,
        data: list
    });
});

/**
 * @desc    Delete Lists
 * @route   DELETE /projects/:slug/boards/:id/lists/:listId
 * @access  Private
 */
exports.deleteList = asyncHandler(async (req, res, next) => {
    
});