
const randomstring = require('randomstring');
const fakerator = require('fakerator');

const randomnames = fakerator();

//data base entries
const entries = 200000

// helper functions to generate random data
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

//data generation

const generateShoesIdArr = () => {
  let shoeIds = {};
  for (let i = 0; i < entries; i ++) {
    var num = generateShoesId();
    shoeIds[num] = true;
  }
  return Object.keys(shoeIds);
}

const shoesIdArr = generateShoesIdArr();

const generateLikedShoes = () => {
  var index = Math.floor(Math.random() * entries);
  var plusindex = Math.floor(Math.random() * 100);
  return shoesIdArr.slice(index, index + plusindex);
}

const generateUsersObjArr = (n) => {
  let arr =[];
  for (var i = 0; i < n; i ++) {
    var obj = {
        _id: i + 1,
        userName: generateUsers() ,
        likedShoes: generateLikedShoes()
    }

    arr.push(obj);
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

const shoesArr = generateShoesArr();
const shoesArrcopy = generateShoesArr();
const generateRelatedShoesArr = () => {
  var arr = [];
  for (var i = 0; i < 12; i++) {
    arr.push(shoesArrcopy[Math.floor(Math.random() * shoesArrcopy.length)])
  }
  return arr;
}
const relatedShoesArr = generateRelatedShoesArr()

const generateFullShoesArr = () => {
  var arr =[]
  for (var i = 0; i < entries; i++) {
    shoesArr[i].relatedProducts = relatedShoesArr;
    arr.push(shoesArr[i]);
  }
  return arr;
}

module.exports = {generateFullShoesArr, generateUsersObjArr}

//node --max-old-space-size=8192 generateData.js



