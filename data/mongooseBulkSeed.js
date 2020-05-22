var mongoose = require('mongoose');
//import models
const {Shoe, User} = require('./mongodb_schema.js');

const {fullShoesArr, usersObjArr} = require('./generateData.js');

const data = require('./MongoData/shoes.json');

mongoose.connect('mongodb://localhost/abibas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


mongoose.connection.on("open", (err) => {
  console.log('start inserting bulks!')
  var bulk = Shoe.collection.initializeOrderedBulkOp();
  var counter = 0;
  fullShoesArr.forEach((doc) => {
  bulk.insert(doc);
  counter++
  if(counter % 500 === 0) {
    console.log('500 rows inserted!')
    bulk.execute((err) => {
      if(err) {
        console.log(err);
      }
      bulk = Shoe.collection.initializeOrderedBulkOp();
      counter = 0;
    })
  }
})

if (counter > 0) {
  bulk.execute(function(err) {
     if(err) {
       console.log(err)
     } else {
       console.log('inserting other rows')
     }
  });
}
  
});





