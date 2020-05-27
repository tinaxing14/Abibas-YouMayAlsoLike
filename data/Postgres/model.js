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
  deleteProduct: (id, callback) => {
    pool.connect().then((client) => {
      return client
              .query(`delete from shoes where id = '${id}'`)
              .then((res) => {
                client.release();
                console.log('product deleted', res)
                callback(null, res.rows[0]);
              })
              .catch((err) => {
                client.release();
                console.log(err.stack);
                callback(err);
              })
    });
  },

  addProduct: (option, callback) => {
    const { shoe_id, title, images, price, href } = option;
    const related_products = option.related_products.replace("[", "{").replace("]", "}");
    const sql = `insert into shoes (shoe_id, title, images, price, href, related_products) values ('${shoe_id}', '${title}', '${images}','${price}','${href}','${related_products}') returning id;`;
    pool.connect().then((client) => {
      return client
              .query(sql)
              .then((res) => {
                client.release();
                callback(null, res.rows[0]);
              })
              .catch((err) => {
                client.release();
                console.log(err.stack);
                callback(err);
              })
    });
  },
  
  likeProduct: (ids, callback) => {
    const { id, userid } = ids;
    const sql = `insert into user_likes (users_id, shoes_id) values ('${userid}', '${id}') returning id;`
    pool.connect().then((client) => {
      return client
              .query(sql)
              .then((res) => {
                client.release();
                callback(null, res.rows[0]);
              })
              .catch((err) => {
                client.release();
                console.log(err.stack);
                callback(err);
              })
    });
  },

  updateProduct: (option, id, callback) => {
    const { shoe_id, title, images, price, href } = option;
    const related_products = option.related_products.replace("[", "{").replace("]", "}");
    const sql = `update shoes set shoe_id = '${shoe_id}', title ='${title}', images = '${images}', price = '${price}', href = '${href}', related_products = '${related_products}' where id = '${id}';`;
    pool.connect().then((client) => {
      return client
              .query(sql)
              .then((res) => {
                client.release();
                callback(null, res.rows[0]);
              })
              .catch((err) => {
                client.release();
                console.log(err.stack);
                callback(err);
              })
    });
  }

};




// console.log(module.exports.getProduct(5, (err, result) => {
//   console.log(result)
// }))
