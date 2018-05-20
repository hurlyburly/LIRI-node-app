require("dotenv").config();
var keys = require("./keys");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var nodeArg = process.argv[2];

var myTweets = function() {
  var params = { screen_name: client.consumer_key };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    print20Tweets(error, tweets, response);
  });
};
var spotifyThisSong = function() {};
var movieThis = function() {};
var doWhatItSays = function() {};

switch (nodeArg) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyThisSong();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
}

function print20Tweets(error, tweets,response) {
  if (!error) {
    for (i = 0; i < 20; i++) {
      var printTweets = "\n" +
        tweets[i].text +
        "\n" +
        tweets[i].created_at +
        "\n_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _\n";
      console.log(printTweets);
      appendLog(printTweets);
    }
  }
}

function appendLog(print) {
  fs.appendFile("log.txt", print, function (err) {
    if (err)
      throw err;
  });
}

