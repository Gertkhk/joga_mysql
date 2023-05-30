const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');

router.get('/:author_ID', authorController.getAuthors)
module.exports = router;