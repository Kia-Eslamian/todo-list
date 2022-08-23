const router = require('express').Router();
const {join} = require('path');

const taskRouter = require('./task/taskRouter');
const userRouter = require('./user/userRouter');


router.use('/task', taskRouter);
router.use('/user', userRouter);


router.get('/', async (req, res) => {
    try {

        return res.render(join(__dirname, '../views/pages/authPage.ejs'));

    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});


module.exports = router;