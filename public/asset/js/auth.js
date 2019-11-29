// ===============
// REGISTRATION FEATURE
// ===============

var registrationForm = document.querySelector('#registrationForm');
registrationForm.addEventListener('submit', (event) => {
event.preventDefault();

var email = registrationForm['registrationEmail'].value;
var password = registrationForm['createPassword'].value;

console.log(email, password);


});