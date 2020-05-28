const pool = require("./index.js");
module.exports = {
  getProduct: (id, callback) => {
    pool.connect().then((client) => {
      return client
        .query(`SELECT related_products FROM shoes WHERE id = '${id}';`)
        .then((res) => {
          var resarr = res.rows[0].related_products
          console.log(resarr)
          return resarr.map(item => {
            return client
                    .query(`SELECT id, shoe_id, title, images, price, href FROM shoes WHERE shoe_id = '${item}';`)
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


/* sample results:
getProduct: 

[
    {
        "id": 17254,
        "title": "Super RNhVi shoes",
        "images": "https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0420_00_plp_standard.jpg",
        "price": 94,
        "href": "https://www.adidas.com/us"
    },
    {
        "id": 16153,
        "title": "Super umpQa shoes",
        "images": "https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0752_00_plp_standard.jpg",
        "price": 86,
        "href": "https://www.adidas.com/us"
    },
    {
        "id": 5381,
        "title": "Super phaWu shoes",
        "images": "https://abibas-pictures.s3.us-east-2.amazonaws.com/FW5477_00_plp_standard.jpg",
        "price": 333,
        "href": "https://www.adidas.com/us"
    },
    {
        "id": 13726,
        "title": "Super MZIRv shoes",
        "images": "https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0752_00_plp_standard.jpg",
        "price": 190,
        "href": "https://www.adidas.com/us"
    },
    {
        "id": 10706,
        "title": "Super XYInf shoes",
        "images": "https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0716_00_plp_standard.jpg",
        "price": 212,
        "href": "https://www.adidas.com/us"
    },
    {
        "id": 8389,
        "title": "Super TmlrO shoes",
        "images": "https://abibas-pictures.s3.us-east-2.amazonaws.com/EF6883_00_plp_standard.jpg",
        "price": 324,
        "href": "https://www.adidas.com/us"
    },
    {
        "id": 5107,
        "title": "Super jYVaQ shoes",
        "images": "https://abibas-pictures.s3.us-east-2.amazonaws.com/BY4027_00_plp_standard.jpg",
        "price": 237,
        "href": "https://www.adidas.com/us"
    },
    {
        "id": 11078,
        "title": "Super ODVLK shoes",
        "images": "https://abibas-pictures.s3.us-east-2.amazonaws.com/FX3600_00_plp_standard.jpg",
        "price": 140,
        "href": "https://www.adidas.com/us"
    },
    {
        "id": 8220,
        "title": "Super TwTFw shoes",
        "images": "https://abibas-pictures.s3.us-east-2.amazonaws.com/FV2809_00_plp_standard.jpg",
        "price": 113,
        "href": "https://www.adidas.com/us"
    },
    {
        "id": 554,
        "title": "Super LdRjJ shoes",
        "images": "https://abibas-pictures.s3.us-east-2.amazonaws.com/FV3299_00_plp_standard.jpg",
        "price": 168,
        "href": "https://www.adidas.com/us"
    },
    {
        "id": 11858,
        "title": "Super kkWnU shoes",
        "images": "https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0747_00_plp_standard.jpg",
        "price": 369,
        "href": "https://www.adidas.com/us"
    },
    {
        "id": 4889,
        "title": "Super kUylj shoes",
        "images": "https://abibas-pictures.s3.us-east-2.amazonaws.com/FV3021_00_plp_standard.jpg",
        "price": 272,
        "href": "https://www.adidas.com/us"
    }
]



*/