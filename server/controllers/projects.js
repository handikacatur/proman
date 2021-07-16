const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Project = require('../models/Project');

/**
 * @desc    GET all projects
 * @route   GET /projects/
 * @access  Private
 */
exports.getProjects = async (req, res, next) => {
    const projects = await Project.find();

    if (projects.length === 0) {
        return next(new ErrorResponse('No project found', 404));
    }

    res.status(200).json({
        success: true,
        data: projects
    });
};

/**
 * @desc    GET single project
 * @route   GET /projects/:slug/
 * @access  Private
 */
exports.getProject = asyncHandler( async (req, res, next) => {
    const project = await Project.findOne({slug: req.params.slug});

    if (!project) {
        return next(new ErrorResponse(`Project with slug ${req.params.slug} not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: project
    });
});

/**
 * @desc    Create project
 * @route   POST /projects/
 * @access  Private
 */
 exports.createProject = asyncHandler( async (req, res, next) => {
    //  check if a project already added
    const checkProject = await Project.findOne({name: req.body.name});

    // checkProject is not null
    if (checkProject) {
        return next(new ErrorResponse(`Project with name ${req.body.name} has already added`, 400));
    }

    const project = await Project.create(req.body);

    res.status(201).json({
        success: true,
        data: project
    });
});

/**
 * @desc    Update project
 * @route   PUT /projects/:slug/
 * @access  Private
 */
exports.updateProject = asyncHandler(async (req, res, next) => {
    // search for project
    let project = await Project.findOne({slug: req.params.slug});

    if (!project) {
        return next(new ErrorResponse(`Project with name ${req.params.slug} not found`, 404));
    }

    project = await Project.findOneAndUpdate({slug: req.params.slug}, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: project
    });
});

/**
 * @desc    Delete project
 * @route   DELETE /projects/:slug/
 * @access  Private
 */
exports.deleteProject= asyncHandler(async (req, res, next) => {
    // search for project
    const project = await Project.findOne({slug: req.params.slug});

    if (!project) {
        return next(new ErrorResponse(`Project with slug ${project} not found`, 404));
    }

    project.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});