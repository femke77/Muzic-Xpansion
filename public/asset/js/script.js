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

var database = firebase.database();

var key = "MTk1ODIzNzZ8MTU3NDM5NzAwNy40NQ";
var input;
var imageURL;
var numEvents;
var page = 1;
var limit = 10;
var numPages;

/**
 * Gets input from user search box, uses ajax get to hit Seat Geek api /performer endpoint
 * and find out if performer exists and has event coming up. Sorting is by date/time.
 */
$("#submit").on("click", function (e) {
    e.preventDefault();
    $("#event-section").empty();
    input = $("#test").val().trim();
    input = input.split(' ').join('-');
    var queryURLPerformers = "https://api.seatgeek.com/2/performers?slug=" + input +
        "&client_id=" + key;

    $.ajax({
        url: queryURLPerformers,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
            if (response.performers.length === 0) {
                $("#modal-message").text("Performer not found. Please check spelling and try again.");
                $("#oops-modal").modal("show");
            } else {
                var hasEvent = response.performers[0].has_upcoming_events;
                imageURL = response.performers[0].image;
                if (hasEvent === true) {
                    numEvents = response.performers[0].num_upcoming_events;
                    numPages = Math.ceil(numEvents / limit);
                    getEvents();
                    $("#next-btn").prop("disabled", false);
                } else {
                    $("#event-section").append("No upcoming events for this performer.")
                }
            }
        });
});

/**
 * Gets events from the Seat Geek /events endpoint using performers argument from user input box
 * MomentJS is used to convert the date time to a more readable format.
 * list-group is used to display multiple events on the card in index
 */
function getEvents() {
    $("#event-section").empty();
    var queryURLEvents = "https://api.seatgeek.com/2/events?performers.slug=" + input +
        "&per_page=" + limit + "&page=" + page + "&client_id=" + key;

    $.ajax({
        url: queryURLEvents,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);

            var results = response.events;          
            for (let i = 0; i < results.length; i++) {             
                var $eventList = $("<ul>");
                $eventList.addClass("list-group");
                $("#event-section").append($eventList);
                var $eventListItem = $("<li class='list-group-item'>");
                $eventListItem.append("<h4>" + results[i].title + "</h4>");
                if (results[i].date_tbd == false) {
                    var dateTime = results[i].datetime_local;
                    dateTime = dateTime.split('T').join(' ');
                    var format = "YYYY/MM/DD hh:mm:ss";
                    var convertedDateTime = moment(dateTime, format)
                    $eventListItem.append(convertedDateTime.format("MM/DD/YY hh:mm A") + "<br/>");                 
                } else {
                    $eventListItem.append("Date and Time TBD")                 
                }
                $eventListItem.append("Venue: " + results[i].venue.name + "<br/>");
                $eventListItem.append("Location: " + results[i].venue.display_location + "<br/>");
                var $ticketBtn = $("<button>", {
                    text: "Buy Tickets",
                    click: function(){
                        window.open(results[i].url);
                    }
                })
                $eventListItem.append($ticketBtn);

                $eventList.append($eventListItem);
            }
        })
}



//--PAGINATION METHODS--------------------------------
$("#next-btn").on("click", function(){    
    if (page <= numPages){
        page++;
        $("#prev-btn").prop("disabled", false)
        getEvents();
        if (page === numPages) {
            $("#next-btn").prop("disabled", true);            
        }  
    } 
});

$("#prev-btn").on("click", function(){
    if (page <= numPages){
        page--;
        $("#next-btn").prop("disabled", false)
        getEvents();
        if (page === 1) {
            $("#prev-btn").prop("disabled", true);            
        }      
    } 
});