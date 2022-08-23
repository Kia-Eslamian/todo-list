const router = require('express').Router();


const taskRouter = require('./task/taskRouter');
const userRouter = require('./user/userRouter');


router.use('/task',taskRouter);
router.use('/user',userRouter);


module.exports = router;