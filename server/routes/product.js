const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/:productid', (req, res) => {
	db.getProduct(req.params.productid, (results) => {
		res.status(200).send(results);
	});
});

module.exports = router;