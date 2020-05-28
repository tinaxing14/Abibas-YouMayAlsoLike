const express = require('express');
const model = require('../../data/Mongo/model.js');
const router = express.Router();

router.delete('/:productid', (req, res) => {
  model.deleteProduct(req.params.productid, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log(results)
      res.status(204).json('deleted');
    }
  })
});

module.exports = router;