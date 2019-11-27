// ==============
// GENERAL APP PROCESS
// ==============

// User begins by searching using the YouTube search feature
// They may begin building a playlist to stream
// If possible, once a video is done playing, the next one will begin.
// At any point of their search, they have the choice to click through links to open up in the accordion. The click functions will be View Nearby Concerts or View Closest Concert (by Date)

// ==============
// FIREBASE
// ==============

// Firebase Config
var firebaseConfig = {
  apiKey: "AIzaSyCh61fKpQfYBZ0MRgJcUfEcop57szkaAnc",
  authDomain: "deploy-f0b72.firebaseapp.com",
  databaseURL: "https://deploy-f0b72.firebaseio.com",
  projectId: "deploy-f0b72",
  storageBucket: "deploy-f0b72.appspot.com",
  messagingSenderId: "280884255831",
  appId: "1:280884255831:web:9b5914a751d3d6fb0f9712",
  measurementId: "G-RFFRMPBZLJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Firebase database ref

$(document).ready(function () {

});

var database = firebase.database();
var input = $(".form-control");
var submit = $("#ytSubmit");
var apiKey = "AIzaSyAfNZnAU5IoLkNDkr3zbWGhWLJJcDwd7rI";

// ==============
// YOUTUBE LOGIC
// ==============

$("#ytSubmit").on("click", function (event) {
  // event.preventdefault();
  var inputVal = input.val().trim();
  var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=" + inputVal + "&key=AIzaSyAfNZnAU5IoLkNDkr3zbWGhWLJJcDwd7rI";


  $.ajax({
    url: queryURL,
    method: "GET",
    data: {
      maxResults: 4
    }
  }).then(function (response) {

    console.log(queryURL);
    console.log(response);
    for (var i = 0; i < results.length; i++) {

      // Creates a div to hold the music
      var musicDiv = $("<div>");

      // Add a title to each video
      var title = results[i].title;
      var viewTitle = $("<p>").text(title);
      musicDiv.prepend(viewTitle);

      // Display music video
      var videoId = response.items[0].id.videoId;
      console.log(videoId)
      // var channel = response[0].items.snippet.channelId;
      // var videoTitle = response[0].items.title;


      var video = $("<iframe allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen>");
      // var p = $("<p>").text("Artist: " + results[i].artist);


      video.attr("src", "https://www.youtube.com/embed/" + videoId);
      $("#video").append(video);
    }
  });
  // ==============
  // SIGNUP FORM 
  // ==============

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

   
//       var email = document.getElementById("mail");

// email.addEventListener("input", function (event) {
//   if (email.validity.typeMismatch) {
//     email.setCustomValidity("I expect an e-mail, darling!");
//   } else {
//     email.setCustomValidity("");
//   }
// });
//       var uemail = document.registration.email;
//       var newPassword = document.registration.password;
//       var confirmPassword = document.registration.password;
//       var uname = document.registration.username;
//       if (ValidateEmail(uemail)) {
//       if (userid_validation(newPassword, 5, 12)) {
//         if (password_validation(password, 7, 12)) {
//           if (password_confirmation(confirmPassword, 7, 12)) {
//             if (allLetter(uname)) {
//               if (alphanumeric(uadd)) {
//                   }
//                 }
//               }
//             }
//           }
//         return false;
//       }
//     }
//   });


  // ==============
  // LOGIN  
  // ==============

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {

  });

  // ==============
  // SIGN IN  
  // ==============
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });

  // ==============
  // MODALS FOR LOGIN/SIGNUP ERRORS  
  // ==============

  });
})