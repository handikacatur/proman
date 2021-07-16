const express = require('express');
const {
    getBoards
} = require('../controllers/boards');

const router = express.Router({mergeParams: true});

router.route('/').get(getBoards);

module.exports = router;