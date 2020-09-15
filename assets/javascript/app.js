$("#spotify").slideUp(1);

//Set up base variable for the chosen mod
var topic = "";

/* ----------------------------------------- FireBase ---------------------------------- */
var config = {
  apiKey: "AIzaSyA9II18kgiRBsKko3xJVcsQ5ai9PsNJtMY",
  authDomain: "mindset-c4818.firebaseapp.com",
  databaseURL: "https://mindset-c4818.firebaseio.com",
  projectId: "mindset-c4818",
  storageBucket: "mindset-c4818.appspot.com",
  messagingSenderId: "4140115652",
};

firebase.initializeApp(config);

var database = firebase.database();

//Variables for firebase mood chart
var happy = 0;
var sad = 0;
var angry = 0;
var scared = 0;
var tired = 0;
var love = 0;

/* ----------------------------------------- All calls controlled by single jQuery ---------------------------------- */
$(".dropdown-menu a").on("click", function () {
  $(".gif").empty();
  $("#spotify").slideDown();

  //Set topic based on chosen dropdown option
  topic = $(this).text();

  //Loads all functions
  loader();

 
// --------------------------------- Function Loader to Call onClick jQuery Trigger ---------------------------
function loader() {
  spotify();
  gif();
  quotes();
  youTube();
}
/* ----------------------------------------- GIF Function ---------------------------------- */
function gif() {
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topic +
    "&api_key=FHh9mWC90FyTtVYHXSy5uFhHubUvyLWb&limit=20";

  // Ajax call to get random gif 
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var random = Math.floor(Math.random() * 21);

    var results = response.data[random];
    var topicGif = $("<img>").addClass("gif");
    topicGif.attr("src", results.images.fixed_height.url);

    $(".gif").append(topicGif);
  });

  /* ----------------------------------------- Quotes Function ---------------------------------- */
}
function quotes() {
  var queryURL = "https://quotable-quotes.p.rapidapi.com/randomQuotes";

  // Ajax call to get quote
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "quotable-quotes.p.rapidapi.com",
      "X-RapidAPI-Key": "6f84e5eceamsh5c5d979bf355c11p1f651ajsneb75d52cb90c",
    },
  }).then(function (response) {
    var quote = $("<h1>").text(response.quote);
    var author = $("<h3>").text("– " + response.author);

    $(".quoteText").prepend(quote);
    $(".quoteAuthor").prepend(author);
  });
}

// --------------------------------- Spotify Function ---------------------------
function spotify() {

  //Variable to capture the bearer token received on authentication API call (POST)
  var bearer = "";

  //Token type required to authorized on the 2nd API call (GET)
  var tokenType = "";

  // Spotify API URL for for authentication with cors anywhere to address CORS errors on authentication
  var authURL =
    "https://accounts.spotify.com/api/token";

  //Spotify API URL to query for Playist
  var queryURL =
    "https://api.spotify.com/v1/search?q=" + topic + "&type=playlist";

  //API POST fora authorization
  $.ajax({
    url: authURL,
    method: "POST",
    headers: {
      Authorization:
        "Basic ZmFjYzg2MTQxZGNmNDAyNWFmYWE1MGRmZTE4Zjg1YjE6YTJmMWM4ODhmOTUxNDFjNTliNzYwMzk5ZGY0NWIyYzI=",
    },
    data: {
      grant_type: "client_credentials",
    },
  }).then(function (response) {
    bearer = response.access_token;
    tokenType = response.token_type;

    //Concatenate the token type and bearer token 
    var auth = tokenType + " " + bearer;

    //Ajax call for the playlist 
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth,
      },
    }).then(function (response) {
      //Randomly choose a playlist from the API response
      i = Math.floor(Math.random() * response.playlists.items.length);

      //Get response and build url to pass into spotify embed player
      var id = response.playlists.items[i].id;
      var urlBuilder = "https://open.spotify.com/embed/playlist/";
      var link = urlBuilder + id;

      //jQuery to update iframe src and load embedded player into DOM
      $("#player").attr("src", link);
    });
  });
}

// --------------------------------- Youtube Function ---------------------------
function youTube() {
  gapi.client.setApiKey("AIzaSyAxPlN1cE06Y33mEtSaUUPR8Yv5LtGWHks");
  return gapi.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function () {
      execute();
    });

  // Make sure the client is loaded before calling this method.
  function execute() {
    return gapi.client.youtube.search
      .list({
        part: "snippet",
        maxResults: 10,
        q: "yoga" + topic,
        topicId: "yoga",
      })
      .then(function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
        console.log("videoId " + response.result.items[0].id.videoId);
        var urlBuild = "https://www.youtube.com/embed/";
        i = Math.floor(Math.random() * response.result.items.length);
        // var tag = document.createElement('script');
        var urlBuild = "https://www.youtube.com/embed/";
        var videoId = response.result.items[i].id.videoId;
        var ytUrl = urlBuild + videoId;
        var yt = $(".player").attr("src", ytUrl);
        console.log("yt", yt);
      });
  }
}
// --------------------------------- Required for Youtube GAPI ---------------------------
gapi.load("client");
