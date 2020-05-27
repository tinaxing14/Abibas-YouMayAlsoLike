const express = require('express');
const model = require('../../data/Postgres/model.js');
const router = express.Router();

router.post('/', (req, res) => {
	model.addProduct(req.body, ( err, results) => {
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