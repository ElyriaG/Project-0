$(".dropdown-menu a").on("click", function () {
  var feeling = $(this).text();

  //Async function for login
  function waitsync() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 1500);
    });
  }

  //Async function for video
  function waitsync2() {
    return new Promise((resolve2) => {
      setTimeout(() => {
        resolve2("resolved");
      }, 4000);
    });
  }

  //Authenticate user
  async function authenticate() {
    const result = await waitsync();
    console.log(result);
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
  // Load video information
  async function execute() {
    const result2 = await waitsync2();
    console.log(result2);
    return gapi.client.youtube.search
      .list({
        part: ["snippet"],
        maxResults: 10,
        q: "yoga for " + feeling ,
      })
      .then(
        function (response) {
          //Choose a random video from response
          i = Math.floor(Math.random() * response.result.items.length);
          var urlBuild = "https://www.youtube.com/embed/";
          var videoId = response.result.items[i].id.videoId;
          var ytUrl = urlBuild + videoId;
          $(".player").attr("src", ytUrl);
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

  authenticate().then(loadClient);
  execute();
});
