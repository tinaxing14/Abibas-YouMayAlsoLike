
const { User, Shoe } = require('./mongodb_schema.js');

module.exports = {
  getProduct: (id, callback) => {
    Shoe.findOne({id: id}, (err, results) => {
      if(err) {
        console.log(err);
      } else {
        callback(null, results);
      }
    });
  },

  deleteProduct: (id, callback) => {
    Shoe.deleteOne({id: id}, (err, results) => {
      if(err) {
        console.log(err);
      } else {
        console.log(results);
        callback(null, results);
      }
    });
  },

  addProduct: (option, callback) => {
    const { id, title, images, price, href, relatedProducts } = option;
    const shoe = [{
      id: id,
      title: title,
      images: images,
      price: price,
      href: href,
      relatedProducts: relatedProducts
    }]
    Shoe.insertMany(shoe, (err, results) => {
      if(err){
        console.log(err);
      } else {
        callback(null, results);
      }
    } )
    
  },

  likeProduct: (ids, callback) => {
    const { id, userid } = ids
    User.findOne({userName: userid}, (err, result) => {
      const arr = [...result.likedShoes, id];
      User.findOneAndUpdate({userName: userid}, {likedShoes: arr}, (err, results) => {
        if(err) {
          console.log(err)
        } else {
          callback(null, results);
        }
      })
    })

  
  },

  updateProduct: (option, id, callback) => {
    const { title, images, price, href, relatedProducts } = option;
    const shoe = {
      id:id,
      title: title,
      images: images,
      price: price,
      href: href,
      relatedProducts: relatedProducts
    };
    Shoe.findOneAndReplace({id: id}, shoe, (err, results) => {
      if(err){
        console.log(err);
      } else {
        callback(null, results);
      }
    })
  },

}

