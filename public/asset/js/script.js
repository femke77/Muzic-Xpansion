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
var database = firebase.database();





$(document).ready(function () {

    var queryURL2 = "https://api.seatgeek.com/2/performers?q=red+hot+chili+peppers&client_id=MTk1ODIzNzZ8MTU3NDM5NzAwNy40NQ"
    var queryURL3 = "https://api.seatgeek.com/2/events?performers.slug=red-hot-chili-peppers&client_id=MTk1ODIzNzZ8MTU3NDM5NzAwNy40NQ"
    var input;

    $.ajax({
        url: queryURL3,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
        });


    $("#submit").on("click", function (e) {
        e.preventDefault();
        input = $("#test").val();
        var queryURL = "https://api.seatgeek.com/2/performers?q=" + input +
            "&client_id=MTk1ODIzNzZ8MTU3NDM5NzAwNy40NQ"
        var queryURL4 = "https://api.seatgeek.com/2/events?performers.slug=" + input + "&client_id=MTk1ODIzNzZ8MTU3NDM5NzAwNy40NQ"
        console.log(input);
        console.log(queryURL4);
        $.ajax({
            url: queryURL4,
            method: "GET"
        })
            .then(function (response) {
                console.log(response)
            });

    })

});