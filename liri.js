/*
*	Load Required Node Modules
*/
var spotifyReq = require('node-spotify-api');
var twitter = require('twitter');
var request = require('request');
var fs = require('fs');

//Load the user keys in keys.js
var keys = require('./keys.js');
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;

/*
*	Input commands parsed
*/
//why do we use slice?
// The "argv" array contains everything given on the command line.
//The first item (argv[0]) will be the path to node itself, and the second item (argv[1]) 
//will be the path to your script code.
// So a slice starting at 2 will discard both of those and return everything else
// that was typed on the command line.These are the arguments that will be used to 
//construct the API query string.

var args = process.argv.slice(2);
var command = args[0];
var userInput = args.slice(1).join(" ");



//checking the arg[1] and then relaying to right function
if (command === "my-tweets") {
    myTweets();
} else if (command === "spotify-this-song") {
    spotifyThis();
} else if (command === "movie-this") {
    movieThis();
} else if (command === "do-what-it-says") {
    fileDoer();
} else {
    console.log("\n ===========================\n No Comprende.Please tell me a command: like this dude! \nmy-tweets \nspotify-this-song \nmovie-this \ndo-what-it-says \n ===========================\n");
}


function spotifyThis() {
    //if no input dedected run this song from back street boys i like it that way.
    var isInputNull = userInput === "" ? userInput = "despacito" : userInput = userInput;
    var spotify = new spotifyReq(keys.spotifyKeys);

    spotify.search({
        type: "track",
        query: userInput,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name); // artist's name
            console.log("Song name: " + data.tracks.items[0].name) // song name
            console.log("External url: " + data.tracks.items[0].album.external_urls.spotify) // external link
            console.log("Album: " + data.tracks.items[0].album.name) // album name
        }

        fs.appendFile("log.txt", "\nAppending this song and artist data: " +
            "\n" + data.tracks.items[0].album.artists[0].name +
            "\n" + data.tracks.items[0].name +
            "\n" + data.tracks.items[0].album.external_urls.spotify +
            "\n" + data.tracks.items[0].album.name, function (err) {
                if (err) {
                    console.log(err);
                }
            })
    })
}


function myTweets() {
    var client = new twitter(keys.twitterKeys);
    // Twitter parameters
    var isInputNull = userInput === "" ? userInput = "ahmetburhan" : userInput = userInput;

    var params = {
        "screen_name": userInput,
        "count": 20
    }
    client.get("statuses/user_timeline", params, function (err, tweet, response) {
        if (err) {
            return console.log(err);
        } else {
            for (var i = 0; i < tweet.length; i++) {
                console.log(tweet[i].created_at);
                console.log(tweet[i].text);

                fs.appendFile("log.txt", "\n" + tweet[i].created_at + "\n" + tweet[i].text, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        }
    })
}

function movieThis() {
    var isInputNull = userInput === "" ? userInput = "'Mr. Nobody" : userInput = userInput;
    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + userInput

    request(queryUrl, function (err, response, body) {
        if (err) {
            return console.log(err);
        } else {
            var rottenExists = JSON.parse(body).Ratings[1] === undefined ? rottenExists = "N/A" : rottenExists = JSON.parse(body).Ratings[1].Value;
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + rottenExists);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }

        fs.appendFile("log.txt", "\n" + "Appending this movie information: " +
            "\n" + JSON.parse(body).Title + "\n" + JSON.parse(body).Year +
            "\n" + JSON.parse(body).imdbRating + "\n" + JSON.parse(body).rottenExists +
            "\n" + JSON.parse(body).Country + "\n" + JSON.parse(body).Language +
            "\n" + JSON.parse(body).Plot + "\n" + JSON.parse(body).Actors, function (err) {
                if (err) {
                    console.log(err);
                }
            })
    })
}

function fileDoer() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        } else {
            var dataArr = data.split(",");
            userInput = dataArr[1];
            command = dataArr[0];

            if (command === "my-tweets") {
                tweetTweet();
            } else if (command === "spotify-this-song") {
                spotifyThis();
            } else {
                movieThis();
            }
        }

        fs.appendFile("log.txt", "User engaged the random file.", function (err) {
            if (err) {
                console.log(err);
            }
        })
    });
}