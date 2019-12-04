$("#alert-reg").hide();
$("#alert-login").hide();

// ===============
// REGISTRATION FEATURE
// ===============
$("#newUser").on("click", function (event) {
    event.preventDefault();

    $("#alert-reg").hide();
    console.log("triggered")
    var email = $("#registrationEmail").val();
    var pass = $("#createPassword").val();
    firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(cred => {
            console.log("new user created");
            console.log(cred);

            //CLOSE AND RESET MODAL
            $("#register-modal").hide();
            $(".modal-backdrop").remove();
            $("form").trigger("reset");

        }).catch(function (error) {
            errorCode = error.code;
            errorMsg = error.message;
            if (errorCode === "auth/invalid-email" || errorCode === "auth/weak-password") {
                $("#alert-reg-msg").html("Please input a valid email and a password of at least 6 characters.")
                $("#alert-reg").show();
             
            }
            if (errorCode === "auth/email-already-in-use"){
                $("#alert-reg-msg").html("This email is already associated with an account. Please login.")
                $("#alert-reg").show();
            }
            
            $(".close").click(function () {
                $("#alert-reg").hide();

            });
        });
});

//LOGIN
$("#user").on("click", function (event) {
    event.preventDefault();
    $("#alert-login").hide();
    var email = $("#loginEmail").val();
    var password = $("#userPassword").val();
    console.log(email + " " + password);
    firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user)

        // CLOSE LOGIN MODAL AND RESET FORM
        $("#login-modal").hide();
        $(".modal-backdrop").remove();
        $("form").trigger("reset");



    }).catch(function (error) {
        errorCode = error.code;
        errorMsg = error.message;
        if (errorCode === "auth/user-not-found") {

            $("#alert-login-msg").html("Email not found. Have you registered yet?")
            $("#alert-login").show();

        }
        if (errorCode === "auth/invalid-email") {

            $("#alert-login-msg").html("Please input a valid email address.")
            $("#alert-login").show();

        }
        if (errorCode === "auth/wrong-password") {

            $("#alert-login-msg").html("Invalid password. Please check the password and try again.")
            $("#alert-login").show();

        }
        if (errorCode === "auth/too-many-requests"){

            $("#alert-login-msg").html("Too many requests. Please try again later.")
            $("#alert-login").show();
        }


        $(".close").click(function () {
            $("#alert-login").hide();

        });
    });
});

//LOGOUT
$("#logout").on("click", function (event) {
    event.preventDefault();
    firebase.auth().signOut()
        .then(function () {
            console.log("user signed out")
            $("#logout-modal").modal("show");
        });
})





