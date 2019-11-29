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

// SHOW CONFIRMATION DIV

// PROMPT MODAL ERRORS

// ===============
// LOG-IN FEATURE
// ===============

var loginForm = document.querySelector('login');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // GRAB USER INFO
    var email = loginForm['email'].value;
    var password = loginForm['password'].value;

    auth.signInWithEmailandPassword(email, password).then(cred => {
        console.log(cred.user)
        // Take user to the main page
        
    })

})

// ===============
// LOG OUT FEATURE
// ===============
var logout = document.querySelector('#logout');
logout.addEventListener('click', (event) => {
    event.preventDefault;
    auth.signOut().then(()=> {
        console.log('User signed out');
    })
})


});