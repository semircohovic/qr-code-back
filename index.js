require('dotenv').config()

const express = require('express');
const morgan = require('morgan');

const router = require('./routes')

const app = express();

app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded());

app.use('/api', router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on: ${process.env.PORT}`);
})