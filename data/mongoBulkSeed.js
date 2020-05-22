const { PerformanceObserver, performance } = require('perf_hooks');
var t0 = performance.now()

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';

const {fullShoesArr, usersObjArr} = require('./generateData.js');

var createNewEntries = function(db, usersObjArr, callback) {
  var t0 = performance.now()
    // Get the collection and bulk api artefacts
    var collection = db.collection('User'),          
        bulkUpdateOps = [];    

    usersObjArr.forEach(function(doc) {
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
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  const db = client.db('abibas');
  createNewEntries(db, fullShoesArr, function(){
    client.close()
  })
});


MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  const db = client.db('abibas');
  createNewEntries(db, usersObjArr, function(){
    client.close()

  })
});

