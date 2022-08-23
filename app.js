const express = require('express');
const session = require('express-session');
const path = require('path');
require('colors');


/* env config */
require('dotenv').config({path: `${__dirname}/.env`});

/* app config */
const config = require('./config');
const app = express();
app.set('port', config.port);

/* mongodb connection */
require('./database/mongodb');

/* body parser */
app.use(express.urlencoded({extended: true}));
app.use(express.json());


/* implementation view engine */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './views/public')));


/* session */
app.use(session({
    secret: process.env.APP_SECRET_AUTH_SESSION,
    resave: true,
    saveUninitialized: true,
    name: "authentication_sess"
}));


/* main router */
app.use('/', require('./routes/mainRouter'));

const httpWebServer = app.listen(app.get('port') || config.port, async () => {
    console.log(`process is run successfully on port:${httpWebServer.address().port}`.bgGreen);
});