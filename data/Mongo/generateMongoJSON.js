const {generateFullShoesArr, generateUsersObjArr} = require('./MongoDataHelpers')
const fs = require('fs');

//generate 10 Json files based on datahelper base entries
for (var i = 0; i < 10; i ++) {
  var shoedata = generateFullShoesArr()
  fs.writeFileSync(`/Users/TinaXING/Downloads/data/shoes${i}.json`, JSON.stringify(shoedata, null, 0));
  console.log('one shoes json file completed')
}

//generate 10000 users data
var userdata = generateUsersObjArr(10000)
fs.writeFileSync(`/Users/TinaXING/Downloads/data/users${i}.json`, JSON.stringify(userdata, null, 0));
console.log('one usrs json file completed')