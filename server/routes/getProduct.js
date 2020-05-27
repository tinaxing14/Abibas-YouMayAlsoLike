const express = require('express');
const model = require('../../data/Postgres/model.js');
const router = express.Router();

router.get('/:productid/relatedproducts', (req, res) => {
	model.getProduct(req.params.productid, ( err, results) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(200).json(results);
    }
	});
});

module.exports = router;