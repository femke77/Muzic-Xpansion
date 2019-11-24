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

    // var queryURL2 = "https://api.seatgeek.com/2/performers?q=red+hot+chili+peppers&client_id=MTk1ODIzNzZ8MTU3NDM5NzAwNy40NQ"
    // var queryURL3 = "https://api.seatgeek.com/2/events?performers.slug=red-hot-chili-peppers&client_id=MTk1ODIzNzZ8MTU3NDM5NzAwNy40NQ"
    var input;



    $("#submit").on("click", function (e) {
        e.preventDefault();
        input = $("#test").val().trim();
        var queryURLPerformers = "https://api.seatgeek.com/2/performers?q=" + input +
            "&client_id=MTk1ODIzNzZ8MTU3NDM5NzAwNy40NQ"
        console.log(input);
        console.log(queryURLPerformers);
        $.ajax({
            url: queryURLPerformers,
            method: "GET"
        })
            .then(function (response) {
                var hasEvent = response.performers[0].has_upcoming_events;
                console.log("performer has event?" + hasEvent);
                if (hasEvent === true){
                    input = input.split(' ').join('-');
                    var queryURLEvents = "https://api.seatgeek.com/2/events?performers.slug=" + input + 
                        "&client_id=MTk1ODIzNzZ8MTU3NDM5NzAwNy40NQ"
                    console.log(input)
                    console.log(queryURLEvents);
                    $.ajax({
                        url: queryURLEvents,
                        method: "GET"
                    })
                        .then(function (response) {
                            console.log(response);
                            var results = response.events;
                            for (let i = 0; i < results.length; i++) {
                                console.log("result " + results[i].title);
                                
                            }
                            

                        });

                }
            });

    });

});