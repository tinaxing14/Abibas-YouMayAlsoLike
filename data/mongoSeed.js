// inserting small dataset to mongoDB

var seeder = require('mongoose-seed');
const { User, Shoe } = require('./mongodb_schema.js')
const {fullShoesArr, usersObjArr} = require('./generateData.js');
const { parse } = require('flatted');
const data1 = require('./MongoData/shoe0.json')

const data = [
  {
    'model': 'User',
    'documents': usersObjArr
  },
  {
    'model': 'Shoe',
    'documents': parse(data1)
  }
];

seeder.connect('mongodb://localhost/abibas', () => {
  seeder.loadModels(['./mongodb_schema.js']);
  seeder.populateModels(data, (err, results) => {
    if(err) {
      console.log(err);
    } else {
      console.log('seeding complete!!');
    }
    seeder.disconnect()
  });

});