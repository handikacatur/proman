const express = require('express');
const {
    getLists,
    createList
} = require('../controllers/lists');

const router = express.Router({mergeParams: true});

router.route('/')
    .get(getLists)
    .post(createList);

module.exports = router;