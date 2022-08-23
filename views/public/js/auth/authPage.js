$(document).ready(function () {

    /* auth forms controller */
    $('.btnController-signin').click(function (e) {
        e.preventDefault();

        showSigninForm();
    });
    $('.btnController-signup').click(function (e) {
        e.preventDefault();

        showSignupForm();
    });

    /* signup */
    $('#creatNewAccountBtn').click(function (e) {
        e.preventDefault();

        signup();
    });

    /* login */
    $('#enterBtn').click(function (e) {
        e.preventDefault();

        login();
    });
});

/** show signin form */
function showSigninForm() {
    /* toggle activation of controllers button */
    $("#btnController-signup").removeClass("active");
    $("#btnController-signin").addClass("active");

    /* toggle display of auth forms */
    $("#signupForm").addClass("d-none");
    $("#signinForm").removeClass("d-none");
}

/** show signup form */
function showSignupForm() {
    /* toggle activation of controllers button */
    $("#btnController-signin").removeClass("active");
    $("#btnController-signup").addClass("active");

    /* toggle display of auth forms */
    $("#signinForm").addClass("d-none");
    $("#signupForm").removeClass("d-none");
}


/** signup operation */
function signup() {
    const email = $('#emailSignup').val();
    const password = $('#passwordSignup').val();

    const alertId = Date.now();


    /* check email validation */
    if (email.length === 0) {
        $('#alertWrapper').append(alertBox(alertId, 'error', 'username is not valid', 'We need to know your email for create new account.'));
    } else if (email.length < 3) {
        $('#alertWrapper').append(alertBox(alertId, 'error', 'username is not valid', 'email must more than 3 characters.'));
    } else if (email.length > 50) {
        $('#alertWrapper').append(alertBox(alertId, 'error', 'username is not valid', 'email must less than 50 characters.'));
    }
        // else if (!username.match(/^[A-Za-z][A-Za-z0-9 -]*$/)) {
        //     $('#alertWrapper').append(alertBox(alertId, 'error', 'username is not valid', 'Username can not start with special characters or numbers.'));
        // }

    /* check password validation */
    else if (password.length === 0) {
        $('#alertWrapper').append(alertBox(alertId, 'error', 'password is not valid', 'You must have a password.'));
    } else if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
        $('#alertWrapper').append(alertBox(alertId, 'error', 'password is not valid', 'Password must be 8 characters and use numbers , special characters , a-z , A-Z'));
    } else {

        const data = {email, password};

        $.ajax({
            type: "POST",
            url: "http://localhost:5000/user/auth/register",
            data,
            success: function (response) {

                if (response.success) {

                    $('#alertWrapper').append(alertBox(alertId, 'success', 'successful', 'Your account created, Now login to your account'));


                } else if (!response.success) {
                    $('#alertWrapper').append(alertBox(alertId, 'error', 'error', response.message));
                }

            },
            error: function (error) {
                console.log(error);
                $('#alertWrapper').append(alertBox(alertId, 'error', 'error', error.responseJSON.message));
            }
        });

    }

}

/** login operation */
function login() {
    const email = $('#emailLogin').val();
    const password = $('#passwordLogin').val();

    const loginUrl = 'http://localhost:5000/user/auth/login';

    const alertId = Date.now();

    /* check username validation */
    if (!email) {
        $('#alertWrapper').append(alertBox(alertId, 'error', 'email is not valid', 'Please fill email'));
    } else if (!password) {
        $('#alertWrapper').append(alertBox(alertId, 'error', 'password is not valid', 'Please fill password'));
    } else {

        const data = {email, password};

        $.ajax({
            type: "post",
            url: loginUrl,
            data,
            success: function (response) {

                if (response.success) {

                    // $('#alertWrapper').append(alertBox(alertId, 'success', 'successful', response.message));
                    window.location.replace('http://localhost:5000/home');

                    console.log(response)

                } else if (!response.success) {
                    $('#alertWrapper').append(alertBox(alertId, 'error', 'error', response.message));
                }

            },
            error: function (error) {
                $('#alertWrapper').append(alertBox(alertId, 'error', 'error', error.responseJSON.message));
            }
        });


    }
}