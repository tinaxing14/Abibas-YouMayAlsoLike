const express = require('express');
const router = express.Router();
const model = require('../../data/Postgres/model.js');

router.post('/:id/likes/:userid', (req, res) => {
	model.likeProduct(req.params, ( err, results) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log(results)
      res.status(201).json(results);
    }
	});
});

module.exports = router;