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
    MktoForms2.whenReady(function (form){
         form.onSuccess(function(values, followUpUrl){
          form.getFormElem().hide();
          document.getElementById('confirmForm').style.visibility = 'visible';
          return false;
        });
})

});