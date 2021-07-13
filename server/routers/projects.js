const express = require('express');
const {
    getProject,
    getProjects
} = require('../controllers/projects');

const router = express.Router({mergeParams: true});

router.route('/').get(getProjects);
router.route('/:name').get(getProject);

module.exports = router;