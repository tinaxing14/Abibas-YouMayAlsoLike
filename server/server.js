const newrelic = require('newrelic');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const getProduct = require('./routes/getProduct');
const likeProduct = require('./routes/likeProduct');
const addProduct = require('./routes/addProduct.js');
const deleteProduct = require('./routes/deleteProduct.js');
const updateProduct = require('./routes/updateProduct.js')

const app = express();
const PORT = process.env.INFO_SERVICE_PORT || 3002;

app.use(cors())
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('./public'));

//get product route
app.use('/api/shoes', getProduct);

//like route
app.use('/api/shoes', likeProduct);

//add item route

app.use('/api/shoes', addProduct);

//delete item route

app.use('/api/shoes', deleteProduct);

//update item route

app.use('/api/shoes/update', updateProduct);


app.listen(PORT, () => {
  console.log('server is listening on PORT', PORT)
});