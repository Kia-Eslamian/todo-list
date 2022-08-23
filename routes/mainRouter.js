// packages
const router = require('express').Router();
const {join} = require('path');

// modules
const banForAlreadyLoggedInUsers = require('../modules/middleware/auth/banForAlreadyLoggedInUsers');
const banForNotLoggedInUsers = require('../modules/middleware/auth/banForNotLoggedInUsers');

// sub routers
const userRouter = require('./user/userRouter');
const taskRouter = require('./task/taskRouter');



router.use('/user', userRouter);
router.use('/task', taskRouter);



/* API */

// root route
router.get('/', (req, res) => {
    try {

        const user = req.session.user;

        if (user) {
            return res.redirect('http://localhost:5000/home');
        } else {
            return res.redirect('http://localhost:5000/door');
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
});


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