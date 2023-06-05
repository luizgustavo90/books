const express = require('express');
const router = express.Router();
const books = require('../services/books');

/* GET books listing. */
router.get('/listBooks', function(req, res, next) {
  try {
    res.json(books.list(req.query));
  } catch(err) {
    console.error(`Error while getting books `, err.message);
    next(err);
  }
});

/* POST books */
router.post('/insertBook', function(req, res, next) {
  try {
    res.json(books.insert(req.body));
  } catch(err) {
    console.error(`Error while adding books `, err.message);
    next(err);
  }
});

/* PUT books */
router.put('/updateBook/:id', function(req, res, next) {
  try {
    res.json(books.update(req.params.id, req.body));
  } catch(err) {
    console.error(`Error while deleting book `, err.message);
    next(err);
  }
});

/* DELETE books */
router.delete('/deleteBook/:id', function(req, res, next) {
  try {
    res.json(books.delete(req.params.id));
  } catch(err) {
    console.error(`Error while deleting book `, err.message);
    next(err);
  }
});

module.exports = router;
