const { performance } = require('perf_hooks');

const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const url = 'mongodb://localhost:27017';

const {generateFullShoesArr, generateUsersObjArr} = require('./MongoDataHelpers');

var createNewEntries = 

  function(db, data, collectionname,) {
    // Get the collection and bulk api artefacts
    var collection = db.collection(collectionname),          
        bulkUpdateOps = [];    
    console.log('start inserting!!')
    data.forEach(function(doc) {
      var t0 = performance.now()
        bulkUpdateOps.push({ "insertOne": { "document": doc } });

        if (bulkUpdateOps.length === 5000) {
            collection.bulkWrite(bulkUpdateOps).then(function() {
                console.log('insert 5000 rows!')
                var t1 = performance.now()
                console.log("Call to add 5000 rows took " + (t1 - t0) + " milliseconds.")
            });
            bulkUpdateOps = [];
        }
    })
    if (bulkUpdateOps.length > 0) {
        collection.bulkWrite(bulkUpdateOps).then(function() {
            console.log('reaching another 5000 rows!')
        });
    }
};

// Use connect method to connect to the server
// MongoClient.connect(url)
//   .then(function(client) {
//     console.log("Connected successfully to server");
//     const db = client.db('abibas');
//     createNewEntries(db, generateFullShoesArr(), "Shoe", function(){
//     client.close()
//     });
//   });


MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  const db = client.db('abibas');
  createNewEntries(db, generateUsersObjArr(2000000), "User", function(){
    client.close()

  })
});

