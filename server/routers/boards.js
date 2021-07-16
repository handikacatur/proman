const express = require('express');
const {
    getBoards,
    getBoard,
    createBoard,
    updateBoard,
    deleteBoard
} = require('../controllers/boards');

// include list router
const lists = require('./lists');

const router = express.Router({mergeParams: true});

// re-route to list
router.use('/:id/lists', lists);

router.route('/')
    .get(getBoards)
    .post(createBoard);

router.route('/:id')
    .get(getBoard)
    .put(updateBoard)
    .delete(deleteBoard);

module.exports = router;