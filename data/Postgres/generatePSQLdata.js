const randomstring = require('randomstring');
const fakerator = require('fakerator');
const randomnames = fakerator();


//base entries
var entries = 20000;

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
    arr.push(Math.floor(Math.random()* entries));
  }
  var string = JSON.stringify(arr);
  //change array to string with "{}" for postgres array format.
  string = string.replace("[", "{").replace("]", "}");
  return string;
}

const imageArr = require('../imageURLS.json')


const generateShoesArr = () => {
  var arr = [];
  for( let i = 0; i < entries; i++) {
    var shoeObj = {
      "shoe_id": shoesIdArr[Math.floor(Math.random() * shoesIdArr.length)],
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

const generateUsersData = (n) => {
  var arr = [];
  for (var i =0; i < n; i ++) {
    var obj = {users_name: generateUsers()}
    arr.push(obj);
  }
  return arr;
}

const generateUserLikesData = (n) => {
  var arr =[];
  for (var i = 0; i < n; i ++) {
    var userid = Math.floor(Math.random() * (n+2)) + 1;
    var shoesid = Math.floor(Math.random() * (entries)) + 1;
    var obj = { users_id: userid ,shoes_id: shoesid}
    arr.push(obj)
  }
  return arr;
}


module.exports = {generateUserLikesData, generateUsersData, generateShoesData}

