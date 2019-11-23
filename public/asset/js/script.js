//Firebase Config
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

//Firebase database ref

$(document).ready(function () {


});

var database = firebase.database();
var input = $(".form-control");
var submit = $("#ytSubmit");
var apiKey = "AIzaSyAfNZnAU5IoLkNDkr3zbWGhWLJJcDwd7rI";

$("#ytSubmit").on("click", function (event) {
    // event.preventdefault();
    var inputVal = input.val().trim();
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=" + inputVal + "&key=AIzaSyAfNZnAU5IoLkNDkr3zbWGhWLJJcDwd7rI";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(queryURL);
        console.log(response);

        var videoId = response.items[0].id.videoId;
        console.log(videoId)
        // var channel = response[0].items.snippet.channelId;
        // var videoTitle = response[0].items.title;
      
            var video = $("<iframe allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen>");
            // var p = $("<p>").text("Artist: " + results[i].artist);
           
            video.attr("src", "https://www.youtube.com/embed/" +videoId);
            $("#video").append(video)
        // }
    });

})


//   // displayVideo function re-renders the HTML to display the appropriate content
//   function displayVideo() {
//     var music = $(this).attr("data-name");
//     var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + music + "&key=AIzaSyAfNZnAU5IoLkNDkr3zbWGhWLJJcDwd7rI"

//   // AJAX - youtubeVid call using the GET method
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).done(function (response) {
//       $("#populated-videos").empty();

//       var results = response.items;
//       console.log(response);
//       for (var i = 0; i < results.length; i++) {

// // Creates a div to hold the music
//         var musicDiv = $("<div>");


// // Display youtubeVid    
//         var youtubeVid = $("<embed>");
//         $("#populated-videos").prepend(musicDiv); 
//       }
     
//     });
//   }

  
// });
