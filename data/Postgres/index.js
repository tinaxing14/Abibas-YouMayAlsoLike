const { Pool } = require('pg');

const pool = new Pool({
  user:'postgres',
  host:'localhost',
  database: 'abibas'
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
});

pool
  .connect()
  .then(client => {
    client.release();
    console.log('Pooling connected!!')
  })
  .catch(err => {
    console.log(err);
  })


module.exports = pool;