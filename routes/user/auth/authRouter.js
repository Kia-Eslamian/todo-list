// packages
const router = require('express').Router();

// models
const userModel = require('../../../models/user');


// register
router.post('/register', async (req, res) => {
    try {

        const { password, email} = req.body;

        /* is email exists?? */
        const isExistsEmail = await userModel.findOne({email});
        if (isExistsEmail) {
            return res.status(409).send({
                success: false,
                message: 'email exists'
            });
        }


        await userModel.create({password, email});


        return res.status(200).send({
            success: true,
            message: 'new account created'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// login
router.post('/login', async (req, res) => {
    try {

        const {email, password} = req.body;

        /* check email is exists??? */
        const user = await userModel.findOne({email});
        if (!user) return res.status(400).send({success: false, message: 'User not exists'});

        /* check password is exists??? */
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) return res.status(400).send({success: false, message: 'password is wrong'});

        /* change login situation to true */
        const loggedInUser = await userModel.findByIdAndUpdate(user._id, {isActive: true});

        /* create user session and active that */
        loggedInUser.isActive = true;
        req.session.user = loggedInUser;

        return res.status(200).send({
            success: true,
            message: 'user logged in'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// logout
router.delete('/logout', async (req, res, next) => {
    try {

        const user = req.session.user;

        await userModel.findOneAndUpdate({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email

        }, {isActive: false});

        req.session.destroy();

        return res.status(200).send({
            success: true,
            message: 'user logged out'
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "internal server error"
        });
    }
});


module.exports = router;