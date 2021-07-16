const express = require('express');
const {
    getProject,
    getProjects,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projects');

// include other resource
const boards = require('./boards');

const router = express.Router();

// Re-route to other resource
router.use('/:slug/boards', boards);

router.route('/')
    .get(getProjects)
    .post(createProject);

router.route('/:slug')
    .get(getProject)
    .put(updateProject)
    .delete(deleteProject);

module.exports = router;