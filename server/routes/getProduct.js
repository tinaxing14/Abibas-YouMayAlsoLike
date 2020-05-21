const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/:productid', (req, res) => {
	db.getProduct(req.params.productid, ( err, results) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(200).json(results);
    }
	});
});

module.exports = router;