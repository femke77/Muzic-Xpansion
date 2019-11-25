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

    var key = "MTk1ODIzNzZ8MTU3NDM5NzAwNy40NQ";
    var input;


    $("#submit").on("click", function (e) {
        e.preventDefault();
        input = $("#test").val().trim();
        input = input.split(' ').join('-');
        var queryURLPerformers = "https://api.seatgeek.com/2/performers?slug=" + input +
            "&client_id=" + key;
        console.log(input);
        console.log(queryURLPerformers);
        $.ajax({
            url: queryURLPerformers,
            method: "GET"
        })
            .then(function (response) {
                console.log(response)
                if (response.performers.length === 0){
                    console.log("Performer not found");
                } else {
                    var hasEvent = response.performers[0].has_upcoming_events;
                    console.log("performer has event? " + hasEvent);
                    if (hasEvent === true) {
                        getEvents();
                    } else {
                        console.log("No upcoming events for this performer.");
                    }
                } 
            });
    });


    function getEvents() {
        
        var queryURLEvents = "https://api.seatgeek.com/2/events?performers.slug=" + input +
            "&client_id=" + key;
        console.log(input)
        console.log(queryURLEvents);
        $.ajax({
            url: queryURLEvents,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                //pull images too and if date_tbd == false go forward with date time otherwise say TBD on card
                var results = response.events;
                for (let i = 0; i < results.length; i++) {
                    var dateTime = results[i].datetime_local;
                    dateTime = dateTime.split('T').join(' ');
                    var format = "YYYY/MM/DD hh:mm:ss";
                    var convertedDateTime = moment(dateTime, format)
                    console.log("title: " + results[i].title);
                    console.log("date & time: " + convertedDateTime.format("MM/DD/YY hh:mm A"));
                    console.log("where: " + results[i].venue.display_location);
                    console.log("tickets: " + results[i].url);
                }
            })
    }





}); //end document.ready