var seeder = require('mongoose-seed');
const { User, Shoe } = require('./mongodb_schema.js')
const {fullShoesArr, usersObjArr} = require('./seedData.js');

const data = [
  {
    'model': 'User',
    'documents': usersObjArr
  },
  {
    'model': 'Shoe',
    'documents': fullShoesArr
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