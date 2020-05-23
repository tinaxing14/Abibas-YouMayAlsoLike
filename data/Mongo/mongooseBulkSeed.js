const { performance } = require('perf_hooks');


var mongoose = require('mongoose');
//import models
const {Shoe, User} = require('./mongodb_schema.js');
const {fullShoesArr, usersObjArr} = require('./generateData.js');

mongoose.connect('mongodb://localhost/abibas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


mongoose.connection.on("open", () => {
  console.log('start inserting bulks!')
  var bulk = Shoe.collection.initializeOrderedBulkOp();
  var counter = 0;
  var t0 = performance.now()
  fullShoesArr.forEach((doc) => {
  bulk.insert(doc);
  counter++
  if(counter % 5000 === 0) {
    bulk.execute((err) => {
      if(err) {
        console.log(err);
      }
      var t1 = performance.now()
      console.log("Call to add 5000 rows took " + (t1 - t0) + " milliseconds.")
      console.log('5000 rows inserted!')
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

mongoose.connection.on("open", (err) => {
  console.log('start inserting bulks!')
  var t0 = performance.now()
  var bulk = User.collection.initializeOrderedBulkOp();
  var counter = 0;
  usersObjArr.forEach((doc) => {
  bulk.insert(doc);
  counter++
  if(counter % 5000 === 0) {
    console.log('5000 rows inserted!')
    bulk.execute((err) => {
      if(err) {
        console.log(err);
      }
      bulk = User.collection.initializeOrderedBulkOp();
      var t1 = performance.now()
      console.log("Call to add 5000 rows took " + (t1 - t0) + " milliseconds.")
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


