const ObjectsToCsv = require('objects-to-csv');
const { generateUserLikesData, generateUsersData, generateShoesData } = require('./generatePSQLdata');

(async () => {

  

  for (let x = 0; x < 100; x++) {
    if(x === 0) {
      var csvShoes = new ObjectsToCsv(generateShoesData());
      await csvShoes.toDisk(`/Users/TinaXING/Downloads/data/shoes.csv`);

    } else {
    csvShoes = new ObjectsToCsv(generateShoesData());
    console.log('start generating Shoes csv file', x)
    await csvShoes.toDisk(`/Users/TinaXING/Downloads/data/shoes.csv`, {append: true});
    }

  }
  console.log('shoes.csv completeted')


})()