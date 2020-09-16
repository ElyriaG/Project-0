//ID and Secret from the spotify API Account
var ClientID = "facc86141dcf4025afaa50dfe18f85b1";
var ClientSecret = "a2f1c888f95141c59b760399df45b2c2";

//bearer to capture the bearer token received on authentication API call (POST)
var bearer = "";

//token type required to authorized on the 2nd API call (GET)
var tokenType = "";

// Spotify API URL for for authentication with cors anywhere to address CORS errors on authentication
var authURL =
  "https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token";

//jQuery function to capture mood choosen
//This function also is what kicks off the API POST and GET to
//Authenticate, Search, and Then update DOM with the Spotify player
$(".dropdown-menu a").on("click", function () {
  //Get mood from dropdown options
  var topic = $(this).text();

  //Spotify API URL
  var queryURL =
    "https://api.spotify.com/v1/search?q=" + topic + "&type=playlist";

  //API POST call to authorize using the Client Credentials 
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

    //Bearer token and token type saved for ajax GET call
    bearer = response.access_token;
    tokenType = response.token_type;

    var auth = tokenType + " " + bearer;

    //Ajax call to get playlist
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth,
      },
    }).then(function (response) {

      //Choose a random playlist from the list received
      i = Math.floor(Math.random() * response.playlists.items.length);

      //Build URL to pass into Spotify embed player
      var id = response.playlists.items[i].id;
      var urlBuilder = "https://open.spotify.com/embed/playlist/";
      var link = urlBuilder + id;

      //jQuery to update iframe src and load embedded player into DOM
      $("#player").attr("src", link);
    });
  });
});
