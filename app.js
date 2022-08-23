const express = require('express');
require('colors');
const app = express();

/* env config */
require('dotenv').config({path: `${__dirname}/.env`});

/* app config */
const config = require('./config');
app.set('port', config.port);

/* mongodb connection */
require('./database/mongodb');

/* body parser */
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/* main router */
app.use('/', require('./routes/mainRouter'));

const httpWebServer = app.listen(app.get('port') || config.port, async () => {
    console.log(`process is run successfully on port:${httpWebServer.address().port}`.bgGreen);
});