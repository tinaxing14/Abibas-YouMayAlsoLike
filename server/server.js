const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const product = require('./routes/product');
const like = require('./routes/like');
const additem = require('./routes/additem.js');
const deleteitem = require('./routes/deleteitem.js');



const app = express();
const PORT = process.env.INFO_SERVICE_PORT || 3002;

app.use(cors())
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('./public'));

//product route
app.use('/product', product);

//like route
app.use('/like', like);

//additem route

app.use('/additem', additem);

//deleteitem route

app.use('/deleteitem', deleteitem);



app.get('/', (req, res) => {
	res.status(200).send('OK get request');
})

app.listen(PORT, () => {
  console.log('server is listening on PORT', PORT)
});