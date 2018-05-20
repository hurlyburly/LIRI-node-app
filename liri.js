require("dotenv").config();
require("twitter").config();
require("spotify").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var nodeArg=process.argv[2];

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
var myTweets=function(){
    console.log(client);
}