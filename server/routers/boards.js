const express = require('express');
const {
    getBoards,
    getBoard,
    createBoard,
    updateBoard,
    deleteBoard
} = require('../controllers/boards');

const router = express.Router({mergeParams: true});

router.route('/')
    .get(getBoards)
    .post(createBoard);

router.route('/:id')
    .get(getBoard)
    .put(updateBoard)
    .delete(deleteBoard);

module.exports = router;