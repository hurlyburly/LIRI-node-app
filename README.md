# LIRI-node-app

## **Description:**

LIRI is a Language Interpretation and Recognition Interface that will take in your parameters and return relevant information.  

This app is built using node.js in order to meet the requirements of a node.js homework assignment for the University of Minnesota Coding Bootcamp.    

 

## **Prerequisites:**

You will need to have node installed in order to run this program.      

Here is the list of npm packages you will need as well: 

+ [Twitter](https://www.npmjs.com/package/twitter)
   
+ [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
   
+ [Request](https://www.npmjs.com/package/request)

    + In order to pull from the [OMDB API](http://www.omdbapi.com).

+ [DotEnv](https://www.npmjs.com/package/dotenv)
     


*This application is run on the command line interface and will require a .env file with the end user's twitter and spotify keys and secrets in order to run.*      

 Here is how your .env file should be formatted: 
 ```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

```

## **How to run the program:**   

These are the commands that can be used:  

`node liri.js my-tweets`  

This command will return your previous 20 tweets and their create dates.  

`node liri.js spotify-this-song '<song name here>'`   
 
 This command will return a list of information related to the song you enter. 

`node liri.js movie-this '<movie name here>'`  

This command will return a list of infromation related to the movie title you enter.

`node liri.js do-what-it-says`  

LIRI will run the text listed in the random.txt file as a command. Feel free to change the text within the random.txt file to whatever other command you would like of the other three listed above. 
