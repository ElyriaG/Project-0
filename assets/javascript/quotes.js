//Set API key and quote genre
var APIKey = "c615aa6dedmsh39f89562dade0d8p122543jsnc8984b13db35";
var topic = "Wisdom";

var queryURL = "https://quotable-quotes.p.rapidapi.com/randomQuotes";

// Ajax call
$.ajax({
  url: queryURL,
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "quotable-quotes.p.rapidapi.com",
    "X-RapidAPI-Key": "6f84e5eceamsh5c5d979bf355c11p1f651ajsneb75d52cb90c",
  },
}).then(function (response) {
  //Set quote and author as headers
  var quote = $("<h1>").text(response.quote);
  var author = $("<h3>").text("– " + response.author);

  //Place in DOM
  $(".quoteText").prepend(quote);
  $(".quoteAuthor").prepend(author);
});
