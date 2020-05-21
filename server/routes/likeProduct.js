const express = require('express');
const db = require('../db');
const router = express.Router();

router.put('/:productid', (req, res) => {
	db.likeProduct(req.params.productid, ( err, results) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(200).json(results);
    }
	});
});

module.exports = router;