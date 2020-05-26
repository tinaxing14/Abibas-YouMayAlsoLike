const pool = require("./index.js");
module.exports = {
  getProduct: (id, callback) => {
    pool.connect().then((client) => {
      return client
        .query(`SELECT related_products FROM shoes WHERE id = '${id}';`)
        .then((res) => {
          var resarr = res.rows[0].related_products
          return resarr.map(item => {
            return client
                    .query(`SELECT id, title, images, price, href FROM shoes WHERE id = '${item}';`)
                    .then((res) => {
                      return res.rows[0]
                    })
          })
        })
        .then((arr) => {
            Promise.all(arr)
              .then((values) => {
                client.release();
                callback(null, values);
              });
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
          callback(err);
        });
    });
  },
};

console.log(module.exports.getProduct(5, (err, result) => {
  console.log(result)
}))
