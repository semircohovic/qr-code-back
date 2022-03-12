const {Router} = require('express');

const scraper = require('./scraper')
const auth = require('./auth')

const app = Router();

app.use('/scraper', scraper);
app.use('/auth', auth);

module.exports = app