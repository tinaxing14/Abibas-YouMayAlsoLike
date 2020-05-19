const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const product = require('./routes/product');
const like = require('./routes/like');
const feedback = require('./routes/feedback');
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

//feedback route
app.use('/feedback', feedback);

app.get('/', (req, res) => {
	res.status(200).send('OK get request');
})

app.listen(PORT);