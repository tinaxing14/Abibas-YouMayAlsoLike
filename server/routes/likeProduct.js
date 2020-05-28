const express = require('express');
const router = express.Router();
const model = require('../../data/Mongo/model.js');

router.post('/likes', (req, res) => {
	model.likeProduct(req.body, ( err, results) => {
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