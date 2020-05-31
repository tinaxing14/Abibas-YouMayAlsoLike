const fs = require('fs');
const { getUserNames, getShoeIds } = require('../data/Mongo/model.js')

getUserNames(10000, (results) => {
  fs.writeFile('./load_tests/userNamesArr.json', JSON.stringify(results), (err) => {
    console.log(err);
  })
});

getShoeIds(10000, (results) => {
  fs.writeFile('./load_tests/shoeIdsArr.json', JSON.stringify(results), (err) => {
    console.log(err);
  })
})
