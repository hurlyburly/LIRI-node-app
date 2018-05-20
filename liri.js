require("dotenv").config();
var keys=require("./keys");
var Twitter=require("twitter");
var Spotify=require("node-spotify-api");

var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var nodeArg=process.argv[2];

var myTweets=function(){
    var params = {screen_name: 'liri_kb'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for(i=0;i<20;i++){
        console.log("\n"+tweets[i].text+"\n"+tweets[i].created_at+"\n_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _\n");
      }
    }
    });
}
var spotifyThisSong=function(){

}
var movieThis=function(){

}
var doWhatItSays=function(){

}

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
