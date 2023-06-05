const express = require('express');
const router = express.Router();
const authors = require('../services/authors');
const formidable = require('formidable');
const fs = require('fs');

/* GET authors listing. */
router.get('/listAuthors', function (req, res, next) {
  try {
    res.json(authors.list());
  } catch (err) {
    console.error(`Error while getting books `, err.message);
    next(err);
  }
});

/* POST authors upload. */
router.post('/uploadAuthors', function (req, res, next) {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log("Logando->",files)
    if (err) {
      next(err);
      return;
    }
    fs.readFile(files.file.filepath, 'utf8', (err, data) => {
      if (err) {
        const error = new Error(err);
        error.statusCode = 400;
        throw error;
      }
      const items = data.split('\n')
      result = authors.upload(items)
  
    });

    res.send('Authors upladed successfully');
  });
});

module.exports = router;
