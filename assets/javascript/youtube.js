$(".dropdown-menu a").on("click", function () {
  // $(".divYoutube").empty();

  var feeling = $(this).text();
  YouTubeFunctions();
  
  function YouTubeFunctions() {
    function authenticate() {
      return gapi.auth2
        .getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
        .then(
          function () {
            console.log("Sign-in successful");
          },
          function (err) {
            console.error("Error signing in", err);
          }
        );
    }
    function loadClient() {
      gapi.client.setApiKey("AIzaSyCW6rZcnHcQI27E5DHDQQliahVnV3afeE8");
      return gapi.client
        .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(
          function () {
            console.log("GAPI client loaded for API");
          },
          function (err) {
            console.error("Error loading GAPI client for API", err);
          }
        );
    }
    // Make sure the client is loaded and sign-in is complete before calling this method.
    function execute() {
      return gapi.client.youtube.search
        .list({
          part: ["snippet"],
          maxResults: 10,
          q: feeling + " yoga",
        })
        .then(
          function (response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
            console.log("Video Info: " + response.result.items[0].id.videoId);

            i = Math.floor(Math.random() * response.result.items.length);
            var urlBuild = "https://www.youtube.com/embed/";
            var videoId = response.result.items[i].id.videoId;
            var ytUrl = urlBuild + videoId;
            var yt = $(".player").attr("src", ytUrl);
          },
          function (err) {
            console.error("Execute error", err);
          }
        );
    }
    gapi.load("client:auth2", function () {
      gapi.auth2.init({
        client_id:
          "861134492961-a4df07k1cog92g7pevh42okaj38d57cc.apps.googleusercontent.com",
      });
    });
  }
  // YouTubeFunctions();
});
