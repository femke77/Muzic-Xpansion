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
var apiKey = "AIzaSyAfNZnAU5IoLkNDkr3zbWGhWLJJcDwd7rI";
var seatGeekKey = "MTk1ODIzNzZ8MTU3NDM5NzAwNy40NQ";
var input;
var imageURL;
var numEvents;
var page = 1;
var limit = 10;
var numPages;

$("#ytSubmit").on("click", function (event) {
    event.preventDefault();
    var inputVal = $("#search-input").val().trim();
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
    checkForEvents();

});


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



/**
 * Gets input from user search box, uses ajax get to hit Seat Geek api /performer endpoint
 * and find out if performer exists and has event coming up. Sorting is by date/time.
 */
function checkForEvents() {
   
    $("#event-section").empty();
    input = $("#search-input").val().trim();
    input = input.split(' ').join('-');
    var queryURLPerformers = "https://api.seatgeek.com/2/performers?slug=" + input +
        "&client_id=" + seatGeekKey;

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
}

/**
 * Gets events from the Seat Geek /events endpoint using performers argument from user input box
 * MomentJS is used to convert the date time to a more readable format.
 * list-group is used to display multiple events on the card in index
 */
function getEvents() {
    $("#event-section").empty();
    var queryURLEvents = "https://api.seatgeek.com/2/events?performers.slug=" + input +
        "&per_page=" + limit + "&page=" + page + "&client_id=" + seatGeekKey;

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

