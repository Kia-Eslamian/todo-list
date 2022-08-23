module.exports = async function (req, res, next) {


    const user = req.session.user;
    if (user) {
        return next();
    }

    // return res.status(400).json({
    //     success: false,
    //     message: "we don't know you"
    // });
    return res.redirect('http://localhost:5000/door');
}