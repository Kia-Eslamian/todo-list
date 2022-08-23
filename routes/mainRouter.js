// packages
const router = require('express').Router();
const {join} = require('path');

// modules
const banForAlreadyLoggedInUsers = require('../modules/middleware/auth/banForAlreadyLoggedInUsers');
const banForNotLoggedInUsers = require('../modules/middleware/auth/banForNotLoggedInUsers');

// sub routers
const userRouter = require('./user/userRouter');
const taskRouter = require('./task/taskRouter');
const noteRouter = require('./note/noteRouter');


router.use('/user', userRouter);
router.use('/task', taskRouter);
router.use('/note', noteRouter);


// API

// authentication page
router.get('/door', banForAlreadyLoggedInUsers, async (req, res) => {
    try {

        return res.render(join(__dirname, '../views/pages/authPage.ejs'));

    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});

// home page
router.get('/home', banForNotLoggedInUsers, async (req, res) => {
    try {

        return res.render(join(__dirname, '../views/pages/homePage.ejs'));

    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});


module.exports = router;