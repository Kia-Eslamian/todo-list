// packages
const router = require('express').Router();
const mongoose = require('mongoose');


// models
const userModel = require('../../models/user');


// sub routers
const authRouter = require('./auth/authRouter');
router.use('/auth', authRouter);


// get user info
router.get('/', async (req, res) => {
    try {

        const user = req.session.user;

        const aggregationPipeLine = [
            {
                '$match': {
                    '_id': mongoose.Types.ObjectId(user._id)
                }
            }, {
                '$project': {
                    '_id': 0,
                    'password': 0,
                    'isActive': 0,
                    'createdAt': 0,
                    'updatedAt': 0,
                    '__v': 0
                }
            }
        ];

        const userInfo = await userModel.aggregate(aggregationPipeLine);

        return res.status(200).json({
            success: true,
            message: "user info",
            data: {result: userInfo[0]}
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// update user info
router.patch('/', async (req, res) => {
    try {
        const fields = {firstName, lastName, email} = req.body;

        await userModel.findByIdAndUpdate(req.session.user._id, fields);

        return res.status(200).json({
            success: true,
            message: "user updated"
        });

    } catch (error) {
        console.log(error);
        return res.stats(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// delete account
router.delete('/', async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


module.exports = router;