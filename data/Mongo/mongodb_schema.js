const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/abibas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('Mongoose MongoDB connected!!')
  }
})

//Schema for shoes and Users collections
const Schema = mongoose.Schema;

const Shoes = new Schema({
  id: String,
  title: String,
  images: String,
  price: Number,
  href: String,
  relatedProducts: [{id: String, title: String, images: String, price: Number, href: String}]
});

const Users = new Schema({
  userName: String,
  likedShoes: [{type: String}]
});

// create models 
const User = mongoose.model('User', Users, 'User');
const Shoe = mongoose.model('Shoe', Shoes, 'Shoe');

// var user = new User({
//   userName: 'Tina',
//   likedShoes: ['FV2802','FC2808','FS1808','AV3808','XY1234','WK2808','ZO3804','FV2808']
// });
// user.save((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('data saved!!')
//   }
// });

// var shoe = new Shoe ({
//   id: 'FV2808',
//   title: 'Superstar Shoes',
//   images: 'https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy/d699a097bfb846298334aad80120f0f2_9366/EG4957_00_plp_standard.jpg', 
//   price: 80, 
//   href: 'https://www.adidas.com/us/superstar-shoes/EG4957.html',
//   relatedProducts: [
//     {
//       id: 'FV2803',
//       title: 'Superstar Shoes',
//       images: 'https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy/d699a097bfb846298334aad80120f0f2_9366/EG4957_00_plp_standard.jpg', 
//       price: 90, 
//       href: 'https://www.adidas.com/us/superstar-shoes/EG4957.html',
//     },
//     {
//       id: 'AB2808',
//       title: 'Superstar Shoes',
//       images: 'https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy/d699a097bfb846298334aad80120f0f2_9366/EG4957_00_plp_standard.jpg', 
//       price: 40, 
//       href: 'https://www.adidas.com/us/superstar-shoes/EG4957.html',
//     },
//     {
//       id: 'AB2808',
//       title: 'Superstar Shoes',
//       images: 'https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy/d699a097bfb846298334aad80120f0f2_9366/EG4957_00_plp_standard.jpg', 
//       price: 40, 
//       href: 'https://www.adidas.com/us/superstar-shoes/EG4957.html',
//     },
//     {
//       id: 'AB2808',
//       title: 'Superstar Shoes',
//       images: 'https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy/d699a097bfb846298334aad80120f0f2_9366/EG4957_00_plp_standard.jpg', 
//       price: 40, 
//       href: 'https://www.adidas.com/us/superstar-shoes/EG4957.html',
//     },
//     {
//       id: 'AB2808',
//       title: 'Superstar Shoes',
//       images: 'https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy/d699a097bfb846298334aad80120f0f2_9366/EG4957_00_plp_standard.jpg', 
//       price: 40, 
//       href: 'https://www.adidas.com/us/superstar-shoes/EG4957.html',
//     },
//     {
//       id: 'AB2808',
//       title: 'Superstar Shoes',
//       images: 'https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy/d699a097bfb846298334aad80120f0f2_9366/EG4957_00_plp_standard.jpg', 
//       price: 40, 
//       href: 'https://www.adidas.com/us/superstar-shoes/EG4957.html',
//     },
//     {
//       id: 'AB2808',
//       title: 'Superstar Shoes',
//       images: 'https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy/d699a097bfb846298334aad80120f0f2_9366/EG4957_00_plp_standard.jpg', 
//       price: 40, 
//       href: 'https://www.adidas.com/us/superstar-shoes/EG4957.html',
//     },
//     {
//       id: 'AB2808',
//       title: 'Superstar Shoes',
//       images: 'https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy/d699a097bfb846298334aad80120f0f2_9366/EG4957_00_plp_standard.jpg', 
//       price: 40, 
//       href: 'https://www.adidas.com/us/superstar-shoes/EG4957.html',
//     },
//     {
//       id: 'AB2808',
//       title: 'Superstar Shoes',
//       images: 'https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy/d699a097bfb846298334aad80120f0f2_9366/EG4957_00_plp_standard.jpg', 
//       price: 40, 
//       href: 'https://www.adidas.com/us/superstar-shoes/EG4957.html',
//     },
//     {
//       id: 'AB2808',
//       title: 'Superstar Shoes',
//       images: 'https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy/d699a097bfb846298334aad80120f0f2_9366/EG4957_00_plp_standard.jpg', 
//       price: 40, 
//       href: 'https://www.adidas.com/us/superstar-shoes/EG4957.html',
//     },
//     {
//       id: 'AB2808',
//       title: 'Superstar Shoes',
//       images: 'https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy/d699a097bfb846298334aad80120f0f2_9366/EG4957_00_plp_standard.jpg', 
//       price: 40, 
//       href: 'https://www.adidas.com/us/superstar-shoes/EG4957.html',
//     },
//     {
//       id: 'AB2808',
//       title: 'Superstar Shoes',
//       images: 'https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy/d699a097bfb846298334aad80120f0f2_9366/EG4957_00_plp_standard.jpg', 
//       price: 40, 
//       href: 'https://www.adidas.com/us/superstar-shoes/EG4957.html',
//     },
//   ]
// });

// shoe.save((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('data saved!!')
//   }
// });

// Shoe.findOne({}, (err, document) => {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log(document)
//   }
// });

module.exports = { User,Shoe }






