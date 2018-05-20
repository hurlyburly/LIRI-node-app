//linking all the necessary npm packages in order to run the program
require("dotenv").config();
var keys = require("./keys");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs"); 

//
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var nodeArg = process.argv[2];

//List of functions for each node commang in process.argv[2] that grab the necessary info from the Twitter, Spotify and OMDB APIs passing callbacks to the print functions related to each get function
var getMyTweets = function() {
  var params = { screen_name: client.consumer_key };
  client.get("statuses/user_timeline", params, printTweets);
};

var getSpotifySong = function() {
  //setting search param : title to a single string by taking each argument after nodeArg and joinng them 
  var title = process.argv.splice(3).join(" ");
  spotify.search({ type: "track", query: title }, printSpotifySong);
};

var getMovie = function() {
};

var getRandomCommand = function() {
};

//List of Functions passed as callbacks in the get functions for each node command in process.argv[2]. These will print the necessary information to the console as well as call the appendLog function once information is received. 
function printSpotifySong(err, data) {
  var song = data.tracks.items[0];
  if (err) {
    return console.log("Error occurred: " + err);
  }
  var songInfo =
    "\n" +
    song.album.artists[0].name +
    "\n" +
    song.preview_url +
    "\n" +
    song.album.name +
    "\n_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _\n";
  console.log(songInfo);
  appendLog(songInfo);
}

function printTweets(error, tweets, response, tweetLimit) {
  if (error) {
    return console.log("Error occurred: " + error);
  }
  if (!error) {
    tweetLimit = 20;
    for (i = 0; i < tweetLimit; i++) {
      var printTweets =
        "\n" +
        tweets[i].text +
        "\n" +
        tweets[i].created_at +
        "\n_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _\n";
      console.log(printTweets);
      appendLog(printTweets);
    }
  }
}

// This will append the information pulled from the API call to the log.txt file
function appendLog(print) {
  fs.appendFile("log.txt", print, function(err) {
    if (err) throw err;
  });
}

//This is the switch case that will run a function depending on which argument the user passes as nodeArg(process.argv[2])
switch (nodeArg) {
  case "my-tweets":
    getMyTweets();
    break;
  case "spotify-this-song":
    getSpotifySong();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
}
