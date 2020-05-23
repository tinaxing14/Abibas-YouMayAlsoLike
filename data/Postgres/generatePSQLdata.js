const randomstring = require('randomstring');
const fakerator = require('fakerator');
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');
const randomnames = fakerator();


//generate postgres data
const generateShoesId = () => {
  const combinations = ['A', 'B', 'C','D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  let randomLetters = combinations[Math.floor(Math.random() * 26)] + combinations[Math.floor(Math.random() * 26)];
  let randomNums = Math.floor(Math.random()*(9999 - 1000) + 1000);
  return randomLetters + randomNums;
};

const generateTitles = () => {
  var shoeName = randomstring.generate({
    length:5,
    charset:'alphabetic'
  });
  return `Super ${shoeName} shoes`;
}

const generatePrice = () => {
  return Math.floor(Math.random()*(399 - 80) + 80);
}

const generateUsers = () => {
var name = randomnames.names.name();
return name;
}

//base entries
var entries = 20000;

const generateShoesIdArr = () => {
  let shoeIds = {};
  for (let i = 0; i < entries; i ++) {
    var num = generateShoesId();
    shoeIds[num] = true;
  }
  return Object.keys(shoeIds);
}

const shoesIdArr = generateShoesIdArr();

const generateRelatedProductsData = () => {
  var arr = [];
  for (var i = 0; i < 12; i++) {
    arr.push(shoesIdArr[Math.floor(Math.random()* shoesIdArr.length)])
  }
  return arr;
}

const imageArr = require('../imageURLS.json')


const generateShoesArr = () => {
  var arr = [];
  for( let i = 0; i < entries; i++) {
    var shoeObj = {
      "id": shoesIdArr[Math.floor(Math.random() * entries)],
      "title": generateTitles(),
      "images": imageArr[Math.floor(Math.random() * imageArr.length)],
      "price": generatePrice(),
      "href": 'https://www.adidas.com/us'
    }
    arr.push(shoeObj);
  }

  return arr;
}

var shoesArr = generateShoesArr();

const generateShoesData = () => {
  return shoesArr.map(item => {
    item['related_products'] = generateRelatedProductsData();
    return item;
  })
  
}


//user base entries 

var userEntries = 10000
const generateUsersData = () => {
  var arr = [];
  for (var i =0; i < userEntries; i ++) {
    var obj = {username: generateUsers()}
    arr.push(obj);
  }
  return arr;
}

const generateUserLikesData = () => {
  var arr =[];
  for (var i = 0; i < userEntries; i ++) {
    var userid = Math.floor(Math.random() * (userEntries+2));
    var shoesid = Math.floor(Math.random() * (entries));
    var obj = { userid: userid ,shoesid: shoesid}
    arr.push(obj)
  }
  return arr;
}

//writing 10 csv files for shoes, one for others

(async () => {
  for (var x = 0; x < 10; x ++) {
    const csv = new ObjectsToCsv(generateShoesData());
    await csv.toDisk(`./PostgresData/shoes${x}.csv`);
    console.log('one shoes csv file completeted')
  }

  const csv2 = new ObjectsToCsv(generateUsersData());
  await csv2.toDisk(`./PostgresData/users.csv`);
  console.log('users csv file completeted');

  const csv3 = new ObjectsToCsv(generateUserLikesData());
  await csv3.toDisk(`./PostgresData/usersLikes.csv`);
  console.log('usersLikes csv file completeted');

  console.log('wirting csv file completed!');

})();
