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
var apiKey = "AIzaSyAfNZnAU5IoLkNDkr3zbWGhWLJJcDwd7rI";
var videoId;

$("#ytSubmit").on("click", function (event) {

    event.preventDefault();
    var inputVal = input.val().trim();
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=" + inputVal + "&key=" + apiKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(queryURL);
        console.log(response);


        var results = response.items;

      
        $("#video").empty();
        for (var i = 0; i < results.length; i++) {
            videoId = results[i].id.videoId;
            console.log(videoId)

            // var list = $("<ul>");
            // list.addClass("list-group");
            // var listItem = $("<li class='list-group-item'>");
            // $("#listItem").append("<h4>" + results[i].snippet.title + "</h4>");
            // $("#listItem").append("<h4>" + results[i].snippet.title + "</h4>");
            // $("#listItem").append("<h4>" + results[i].snippet.description + "</h4>");
            // $("#listItem").append("<h4>" + results[i].snippet.publishedAt + "</h4>");

            var video = $("<iframe width='300' height='200'allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen>");


            video.attr("src", "https://www.youtube.com/embed/" + videoId);

            var parTitle = results[i].snippet.title;
            // var pardesc = $("<p>").html("Description : " + results[i].snippet.description);
            // var parPub = $("<p>").html("Published At : " + results[i].snippet.publishedAt);
            // console.log("tittle: " + results[i].snippet.title);

            var $eventList = $("<ul>");
            $eventList.addClass("list-group");
            $("#video").append($eventList);
            var $eventListItem = $("<li class='list-group-item'>");
            $eventListItem.append(video);
            $eventListItem.append("<h4>" + "Title : " + results[i].snippet.title + "</h4>");
            $eventListItem.append("<h5>" + "Description : " + results[i].snippet.description + "</h5>");
            $eventListItem.append("<h6>" + " Published : " + results[i].snippet.publishedAt + "</h6>");
            // $eventListItem.append("<h6>" +  parTitle + "</h6>");

            $eventList.append($eventListItem);
            //$("#video").append(video, parTitle, pardesc, parPub)


        }
     
    });

})




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
                var video = $("<iframe width='300' height='200'allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen>");
                video.attr("src", "https://www.youtube.com/embed/" + videoId);
                var parTitle = results[i].snippet.title;

                var $eventList = $("<ul>");
                $eventList.addClass("list-group");
                $("#video2").append($eventList);
                var $eventListItem = $("<li class='list-group-item'>");
                $eventListItem.append(video);
                $eventListItem.append("<h4>" + "Title : " + results[i].snippet.title + "</h4>");
                $eventListItem.append("<h5>" + "Description : " + results[i].snippet.description + "</h5>");
                $eventListItem.append("<h6>" + "Published : " + results[i].snippet.publishedAt + "</h6>");
                $eventList.append($eventListItem);
            }
          
        });

    });



