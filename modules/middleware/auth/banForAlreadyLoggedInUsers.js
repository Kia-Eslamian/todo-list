module.exports = async function (req, res, next) {


    const user = req.session.user;

    if (user) {
        // return res.status(400).json({
        //     success: false,
        //     message: "already logged in"
        // });
        return res.redirect('http://localhost:5000/home');
    }


    next();

}