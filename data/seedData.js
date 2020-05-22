const randomstring = require('randomstring');

//data base entries
const entries = 100

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
  var name = randomstring.generate({
    length:8,
    charset:'alphabetic'
  });
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

const generateUsersObjArr = () => {
  let arr =[];
  for (var i = 0; i < entries; i ++) {
    var obj = {
        userName: generateUsers() ,
        likedShoes: generateLikedShoes()
    }

    arr.push(obj);
  }
  return arr;
}

const usersObjArr = generateUsersObjArr();

const image = require('./fetchImageURLs.js')
const imageArr = image.imageArr;

const generateShoesArr = () => {
  var arr = [];
  for( let i = 0; i < entries; i++) {
    var shoeObj = {
      id: shoesIdArr[Math.floor(Math.random() * entries)],
      title: generateTitles(),
      images: imageArr[Math.floor(Math.random() * imageArr.length)],
      price: generatePrice(),
      href: 'https://www.adidas.com/us'
    }
    arr.push(shoeObj);
  }

  return arr;
}

const shoesArr = generateShoesArr();
const generateRelatedShoesArr = () => {
  var arr = [];
  for (var i = 0; i < 12; i++) {
    arr.push(shoesArr[Math.floor(Math.random() * shoesArr.length)])
  }
  return arr;
}

const generateFullShoesArr = () => {
  return shoesArr.map((item) => {
    return item.relatedProducts = generateRelatedShoesArr()
  });
}

const fullShoesArr = generateFullShoesArr();

module.exports = { fullShoesArr, usersObjArr };





