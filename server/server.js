const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const getProduct = require('./routes/getProduct');
const likeProduct = require('./routes/likeProduct');
const addProduct = require('./routes/addProduct.js');
const deleteProduct = require('./routes/deleteProduct.js');



const app = express();
const PORT = process.env.INFO_SERVICE_PORT || 3002;

app.use(cors())
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('./public'));

//product route
app.use('/product', getProduct);

//like route
app.use('/like', likeProduct);

//additem route

app.use('/additem', addProduct);

//deleteitem route

app.use('/deleteitem', deleteProduct);



app.get('/', (req, res) => {
	res.status(200).send('OK get request');
})

app.listen(PORT, () => {
  console.log('server is listening on PORT', PORT)
});