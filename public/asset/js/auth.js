// ===============
// REGISTRATION FEATURE
// ===============

var registrationForm = document.querySelector("#registrationForm");
registrationForm.addEventListener("submit", (event) => {
event.preventDefault();

const email = registrationForm["registrationEmail"].value;
const password = registrationForm["#createPassword"].value;

console.log(email, password);


})