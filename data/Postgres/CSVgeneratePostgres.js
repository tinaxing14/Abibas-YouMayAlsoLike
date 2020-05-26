const ObjectsToCsv = require('objects-to-csv');
const { generateUserLikesData, generateUsersData, generateShoesData } = require('./generatePSQLdata');

(async () => {
  // for (let x = 0; x < 100; x++) {
  //   if(x===0) {
  //     var csv = new ObjectsToCsv(generateUserLikesData(1));
  //     await csv.toDisk(`/Users/TinaXING/Downloads/data/userlikes.csv`);
  //   }
  //    csv = new ObjectsToCsv(generateUserLikesData(1000));
  //   console.log('start generating UserLikes csv file', x)
  //   await csv.toDisk(`/Users/TinaXING/Downloads/data/userlikes.csv`,{append: true});
  // }
  // console.log('userlikes.csv completeted')

  // for (let x = 0; x < 100; x++) {
  //   if(x === 0) {
  //     csv = new ObjectsToCsv(generateUsersData(1));
  //     await csv.toDisk(`/Users/TinaXING/Downloads/data/users.csv`);

  //   } else {
  //   csv = new ObjectsToCsv(generateUsersData(1000));
  //   console.log('start generating Users csv file', x)
  //   await csv.toDisk(`/Users/TinaXING/Downloads/data/users.csv`, {append: true});
  //   }

  // }
  // console.log('users.csv completeted')

  for (let x = 0; x < 100; x++) {
    if(x === 0) {
      var csv = new ObjectsToCsv(generateShoesData());
      await csv.toDisk(`/Users/TinaXING/Downloads/data/shoes.csv`);

    } else {
    csv = new ObjectsToCsv(generateShoesData());
    console.log('start generating Shoes csv file', x)
    await csv.toDisk(`/Users/TinaXING/Downloads/data/shoes.csv`, {append: true});
    }

  }
  console.log('shoes.csv completeted')


})()