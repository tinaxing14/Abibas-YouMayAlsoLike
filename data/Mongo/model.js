const { User, Shoe } = require("./mongodb_schema.js");
const useCache = require('./cache.js');

module.exports = {
  getProduct: (id, callback) => {
    Shoe.findOne({ id: Number(id) })
      .cache(id)
      .then((result => {
        callback(null, result)
      }))
      .catch((err) => {
        callback(err)
      })
  },

  deleteProduct: (id, callback) => {
    Shoe.deleteOne({ id: id }, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, results);
      }
    });
  },

  addProduct: (option, callback) => {
    const { id, title, images, price, href, relatedProducts } = option;
    const shoe = [
      {
        id: id,
        title: title,
        images: images,
        price: price,
        href: href,
        relatedProducts: relatedProducts,
      },
    ];
    Shoe.insertMany(shoe, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, results);
      }
    });
  },

  likeProduct: (ids, callback) => {
    const { id, userid } = ids;
    User.findOne({ userName: userid }, (err, result) => {
      console.log('origin arr', result.likedShoes)
      let index = result.likedShoes.indexOf(id);
      let arr;
      if (index < 0) {
        arr = [...result.likedShoes, id];
      } else {
        arr = result.likedShoes.slice()
        arr.splice(index, 1)
      }
      User.findOneAndUpdate(
        { userName: userid },
        { likedShoes: arr },
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            callback(null, results);
          }
        }
      );
    });
  },

  updateProduct: (option, id, callback) => {
    const { title, images, price, href, relatedProducts } = option;
    const shoe = {
      id: id,
      title: title,
      images: images,
      price: price,
      href: href,
      relatedProducts: relatedProducts,
    };
    Shoe.findOneAndReplace({ id: id }, shoe, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, results);
      }
    });
  },

  getUserNames: (limit, callback) =>{
    User.find({})
      .limit(limit)
      .exec((err, results) => {
        if(err) {
          console.log(err)
        }
        var arr = results.map(item => item.userName)
        callback(arr)
      })
  },

  getShoeIds: (limit, callback) => {
    Shoe.find({})
    .limit(limit)
    .exec((err, results) => {
      if(err) {
        console.log(err)
      }
      var arr = results.map(item => item.id)
      callback(arr)
    })
  }
};
