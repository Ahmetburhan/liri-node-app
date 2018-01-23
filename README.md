LIRI - A Node App via Command Line
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

Node-Liri-App

Basic Usage instructions

Clone repo
npm install  //all the packages you need is saved in package.json
cd liri-node-app
Please see notes below to run the app
ENJOY!
Contributing
Fork it!
Create your feature branch: git checkout -b my-new-feature
Commit your changes: git commit -am 'Add some feature'
Push to the branch: git push origin my-new-feature
Submit a pull request :D

Tech Used
NodeJS
JavaScript
NPM Request Request.
NPM Twitter Twitter.
NPM Spotify Spotify.
NPM IMDB OMDB API.


##Notes

LIRI will display your latest tweets. If you dont have a Twitter account it will default to my Twitter if no parameters are inputted
Liri will work four different ways which can take in one of the following commands:

my-tweets

spotify-this-song

movie-this

do-what-it-says

##What Each Command Should Do

node liri.js my-tweets <twitter user name here>
This is added functionality you dont have to put a name if you like to read my last 20 tweets

This will show your last 20 tweets and when they were created at in your terminal/bash window.
If no username is entered my default twitter will show.
node liri.js spotify-this-song <song name here>

This will show the following information about the song in your terminal/bash window
Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
if no song is provided then your program will default to
"The Sign" by Ace of Base
node liri.js movie-this <movie name here>

This will output the following information to your terminal/bash window:
Title of the movie.
Year the movie came out.
IMDB Rating of the movie.
Country where the movie was produced.
Language of the movie.
Plot of the movie.
Actors in the movie.
Rotten Tomatoes Rating.
Rotten Tomatoes URL.

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
It's on Netflix!

node liri.js do-what-it-says

This uses the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
which is
spotify-this-song despacito
