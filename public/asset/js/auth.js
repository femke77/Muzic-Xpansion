
// ===============
// REGISTRATION FEATURE
// ===============
$("#newUser").on("click", function (event) {
    event.preventDefault();
    console.log("new user created");
    var email = $("#registrationEmail").val();
    var pass = $("#createPassword").val();
    firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(cred => {
            console.log(cred);
            $("#register-modal").hide();
            $(".modal-backdrop").remove();
            $("form").trigger("reset");
           
        }).catch(function (error) {
            errorCode = error.code;
            errorMsg = error.message;
            if (errorCode === "auth/invalid-email" || errorCode === "auth/weak-password") {
                $(".modal-alert").append('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong> Please input a valid email and a' +
                    ' password of at least 6 characters.</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
                $(".alert").alert("show");
            }

        });
});

//LOGIN
$("#user").on("click", function (event) {
    event.preventDefault();
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
            $(".modal-alert-login").append('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong> Email not found. Have you registered yet?' +
                '</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
            $(".alert").alert("show");
        }
        if (errorCode === "auth/invalid-email") {
            $(".modal-alert-login").append('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong> Please input a valid email address.' +
                '</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
            $(".alert").alert("show");
        }
        if (errorCode === "auth/wrong-password") {
            $(".modal-alert-login").append('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong> Invalid password. Please check the password and try again.' +
                '</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
            $(".alert").alert("show");
        }

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





