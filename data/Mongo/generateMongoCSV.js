const ObjectsToCsv = require('objects-to-csv');
const {generateFullShoesArr, generateUsersObjArr} = require('./MongoDataHelpers');


(async () => {
  for (var x = 0; x < 10; x++) {
    const csv = new ObjectsToCsv(generateFullShoesArr());
    if(x === 0) {
      await csv.toDisk(`/Users/TinaXING/Downloads/data/shoes.csv`);
    } else {
      await csv.toDisk(`/Users/TinaXING/Downloads/data/shoes.csv`, {append: true});
    }
   
    console.log(x, 'one shoes csv file completeted')
  }

  // const csv2 = new ObjectsToCsv(generateUsersObjArr(10000));
  // await csv2.toDisk(`./MongoData/users${x}.csv`);
  // console.log('one users csv file completeted')

  // console.log('wirting csv file completed!')
})()
