//Firebase Config

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var apiKey = config.YT_API_KEY;
var seatGeekKey = config.SG_API_KEY;

var videoId;
var input;
var imageURL;
var numEvents;
var page = 1;
var limit = 10;
var numPages;


$("#prev-btn").hide();
$("#next-btn").hide();

/**
 * Gets input from user search box, uses ajax get to hit Seat Geek api /performer endpoint
 * and find out if performer exists and has event coming up. Sorting is by date/time.
 */
$("#ytSubmit").on("click", function (event) {

    event.preventDefault();
    $("#next-btn").prop("disabled", true);
    $("#prev-btn").prop("disabled", true);
    console.log("submit btn on click");
    $("#event-section").empty();
    input = $("#search-input").val().trim();
    if (input === ""){
        $("#modal-message").text("Please enter an artist or band name in the search bar.");
        $("#oops-modal").modal("show");
    } else {
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

                        if (numEvents > limit) {
                            $("#next-btn").prop("disabled", false);
                        }

                    } else {
                        $("#event-section").append("No upcoming events for this performer.")
                    }
                    ytSearch();
                }
            });
    }
   
});

// HIDING THE RECOMMENDED BUTTON FROM THE USER.
$("#rec").hide();

// THIS FUNCTION WILL EXECUTE A SEARCH ON YOUTUBE ONCE AN ARTIST ENTERED IN TO THE SEARCH BAR AND THE SUBMIT BUTTON IS CLICKED. 
function ytSearch() {
    var inputVal = $("#search-input").val().trim();
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=" + inputVal + "&key=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);
        var results = response.items;
        $("#video").empty();
        $("#video2").empty();
        for (var i = 0; i < results.length; i++) {
            videoId = results[i].id.videoId;
            console.log(videoId)
            var videoFrame = $("<div class='videoFrame'>");
            var video = $("<iframe allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen>");
            video.attr("src", "https://www.youtube.com/embed/" + videoId);
            videoFrame.append(video);

            var $eventList = $("<ul>");
            $eventList.addClass("text-center");
            $eventList.addClass("list-group");
            $("#video").append($eventList);
            var $eventListItem = $("<li class='list-group-item'>");
            $eventListItem.append(videoFrame);
            $eventListItem.append("<h4>" + "Title : " + results[i].snippet.title + "</h4>");
            // LOOK INTO DOT DOT DOT LINK FOR DISCRIPTION!!!!
            // $eventListItem.append("<h5>" + "Description : " + results[i].snippet.description + "</h5>");
            $eventListItem.append("<h6>" + " Published : " + results[i].snippet.publishedAt + "</h6>");


            $eventList.append($eventListItem);


            $("#rec").show();
        };
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
            $("#prev-btn").show();
            $("#next-btn").show();
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
                    class: "btn btn-primary",
                    click: function () {
                        window.open(results[i].url);
                    }
                })
                $eventListItem.append($ticketBtn);

                $eventList.append($eventListItem);
                
            }
            $(".main")[0].scrollIntoView();
        });
       
}



//--PAGINATION METHODS FOR EVENT LISTS----------------------------
$("#next-btn").on("click", function () {
    if (page <= numPages) {
        page++;
        $("#prev-btn").prop("disabled", false)
        getEvents();
        if (page === numPages) {
            $("#next-btn").prop("disabled", true);
        }
    }
});

$("#prev-btn").on("click", function () {
    if (page <= numPages) {
        page--;
        $("#next-btn").prop("disabled", false)
        getEvents();
        if (page === 1) {
            $("#prev-btn").prop("disabled", true);
        }
    }
});

//------GET RECOMMENDED VIDEOS AND DISPLAY--------------------------------
$("#rec").on("click", function (event) {


    event.preventDefault();


    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=" + videoId + "&type=video&key=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(queryURL);
        console.log(response);

        var results = response.items;

        var videoId;
        $("#video2").empty();
        for (var i = 0; i < results.length; i++) {
            videoId = results[i].id.videoId;
            console.log(videoId)
            var videoFrame = $("<div class='videoFrame'>");
            var video = $("<iframe allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen>");
            video.attr("src", "https://www.youtube.com/embed/" + videoId);
            videoFrame.append(video);

            var parTitle = results[i].snippet.title;
            var $eventList = $("<ul>");
            $eventList.addClass("float-left");
            $eventList.css("width", "50%");
            $eventList.addClass("text-center");
            $eventList.addClass("list-group");
            $("#video2").append($eventList);
            var $eventListItem = $("<li class='list-group-item'>");
            $eventListItem.append(videoFrame);
            $eventListItem.append("<h4>" + "Title : " + results[i].snippet.title + "</h4>");
            // $eventListItem.append("<h5>" + "Description : " + results[i].snippet.description + "</h5>");
            $eventListItem.append("<h6>" + "Published : " + results[i].snippet.publishedAt + "</h6>");
            $eventList.append($eventListItem);
        }

    });

});







 
