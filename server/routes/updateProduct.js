const express = require('express');
const model = require('../../data/Postgres/model.js');
const router = express.Router();

router.put('/:id', (req, res) => {
	model.updateProduct(req.body, req.params.id, ( err, results) => {
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