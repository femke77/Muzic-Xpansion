// ===============
// REGISTRATION FEATURE
// ===============

var registrationForm = document.querySelector('#registrationForm');
registrationForm.addEventListener('submit', (event) => {
event.preventDefault();

// USER INPUT
var email = registrationForm['registrationEmail'].value;
var password = registrationForm['createPassword'].value;

// CREATE NEW USER
firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred);
})

// CREATE MODAL ALERT IF USER EXISTS

// CREATE MODAL ALERT IF PASSWORD DOESN'T MEET SPECIFICATIONS

// PROMPT MODAL ERRORS

// ===============
// LOG-IN FEATURE
// ===============

var loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // GRAB USER INFO
    var email = loginForm['loginEmail'].value;
    var password = loginForm['loginPassword'].value;

    auth.signInWithEmailandPassword(email, password).then(cred => {
        console.log(cred.user)

    // CLOSE LOGIN MODAL AND RESET FORM
    var modal = document.querySelector('#login-modal');
    modal.getInstance(modal).close();
    loginForm.reset();
    })

    // REVEAL USER CONTENT

})

// ===============
// LOG OUT LOGIC
// ===============
var logout = document.querySelector('#logout');
logout.addEventListener('click', (event) => {
    event.preventDefault;
    auth.signOut().then(()=> {
        console.log('User signed out');
    })
})

// HIDE CONTENT FROM USER

});
