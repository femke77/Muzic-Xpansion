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


  $(document).ready(function(){

    var queryURL = "https://api.seatgeek.com/2/performers?q=red+hot&client_id=MTk1ODIzNzZ8MTU3NDM5NzAwNy40NQ"
    var queryURL2 = "https://api.seatgeek.com/2/events?q=red+hot+chili+peppers&client_id=MTk1ODIzNzZ8MTU3NDM5NzAwNy40NQ"
    

    $.ajax({
        url: queryURL2,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
        });




  });