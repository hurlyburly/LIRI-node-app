//linking all the necessary npm packages in order to run the program
require("dotenv").config();
var keys = require("./keys");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");

//Initializing Spotify and Twitter
var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

//Setting variables for Node arguments
var nodeArg = process.argv[2];
var title = process.argv
  .splice(3)
  .join(" ")
  .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");

//List of functions for each node command in process.argv[2] that grabs the necessary info from the Twitter, Spotify and OMDB APIs passing callbacks to the print functions related to each get...() function
var getMyTweets = function() {
  var params = { screen_name: twitter.consumer_key };
  twitter.get("statuses/user_timeline",params,printTweets);
  // looking into setting up get functions with promises rather than as callbacks. Will implement this after checking with TA.
  //return twitter.get("statuses/user_timeline", params);
};

var getSpotifySong = function() {
  if(title){
  spotify.search({ type: "track", query: title }, printSpotifySong);
  } else{
        spotify.search({ type: "track", query: "The Sign Ace of Base" }, printSpotifySong);
  }
};

var getMovie = function() {
  if(title){
  var url =
    "https://www.omdbapi.com/?t=" + title + "&y=&plot=full&apikey=trilogy";
  request(url, printMovie);
  }
  else{ 

  var url="https://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=full&apikey=trilogy";
  request(url, printMovie);

  }
};

var getRandomCommand = function() {
  fs.readFile("random.txt","UTF-8", function(err, data) {
    setRandomCommand(data, err);
    //calling switch case logic function inside of getRandomCommand function in order to execute the command listed in the random.txt file
    nodeCommandLogic();
  });
};

function setRandomCommand(data, err) {
  var command = data.split(",");
  if (err)
    throw err;
  nodeArg = command[0];
  if (command.length > 1) {
    title = command[1].replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
  }
  else {
    title = "";
  }
}

//List of Functions passed as callbacks in the get functions for each node command in process.argv[2]. These will print the necessary information to the console as well as call the appendLog function once information is received.

function printSpotifySong(err, data) {
  var song = data.tracks.items[0];
  if (err) {
    return console.log("Error occurred: " + err);
  }
  var songInfo =
    "\n_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _\n\n" +
    "Artist: " +
    song.album.artists[0].name +
    "\n" +
    "Preview URL: " +
    song.preview_url +
    "\n" +
    "Album: "+
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

function printMovie(error, response, body) {
  if (error) {
    return console.log("Error occurred:" + error);
  }

  var movieObject = JSON.parse(body);
  var movieDetails =
    "\n_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _\n\n" +
    "Title: " +
    movieObject.Title +
    "\n" +
    "Year: " +
    movieObject.Year +
    "\n" +
    "imdb Rating: " +
    movieObject.imdbRating +
    "\n" +
    "Rotten Tomatoes: " +
    // movieObject.Ratings[1].Value +
    "\n" +
    "Country: " +
    movieObject.Country +
    "\n" +
    "Plot: " +
    movieObject.Plot +
    "\n" +
    "Actors: " +
    movieObject.Actors +
    "\n_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _\n";
  console.log(movieDetails);
  appendLog(movieDetails);
}

// This will append the information pulled from the API call to the log.txt file
function appendLog(print) {
  fs.appendFile("log.txt", print, function(err) {
    if (err) throw err;
  });
}

//This is the switch case that will run a function depending on which argument the user passes as nodeArg(process.argv[2])

function nodeCommandLogic() {
  switch (nodeArg) {
    case "my-tweets":
      getMyTweets();
      break;
    case "spotify-this-song":
      getSpotifySong();
      break;
    case "movie-this":
      getMovie();
      break;
    case "do-what-it-says":
      getRandomCommand();
      break;
  }
}

nodeCommandLogic();
