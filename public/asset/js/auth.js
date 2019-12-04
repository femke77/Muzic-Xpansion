// ===============
// REGISTRATION FEATURE
// ===============
$("#newUser").on("click", function(event){
    event.preventDefault();
    console.log("new user created");
    var email = $("#registrationEmail").val();
    var pass = $("#createPassword").val();
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(cred => {
        console.log(cred);
    });
    $("#register-modal").hide();
    $(".modal-backdrop").remove();
    $("form").trigger("reset");
})

//LOGIN
$("#user").on("click", function(event){
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
       
       
    });
});

//LOGOUT
$("#logout").on("click", function(event){
    event.preventDefault();
    firebase.auth().signOut().then(function(){
              console.log("user signed out")
    });
})


//what i did to fix code: 
// translated to jquery,
// place where auth. was being called should be firebase.auth() 
// typo in signInWithUserNameAndPassword (the a was lowercase)
// all id's in login and register were made unique (had to for jquery)
// modal dismiss function was unrecognized, switched to hide()
// reset by trigger


