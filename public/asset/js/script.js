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

    console.log("test")

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

        var video = $("<iframe allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen>");

        video.attr("src", "https://www.youtube.com/embed/" + videoId);
        $("#video").append(video)

    });

})
