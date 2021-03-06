const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const jwt = require('express-jwt');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors());

//Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

//Routes
const api = process.env.API_URL;
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
app.use(`${api}/products`,productsRouter);
app.use(`${api}/categories`,categoriesRouter);
app.use(`${api}/users`,usersRouter);
app.use(`${api}/orders`,ordersRouter);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(() => {
    console.log('Database Connection is ready...');
})
.catch((err) => {
    console.log(err);
})


//Server
app.listen(3000, () => {
    console.log('Server is running http://localhost:3000');
})