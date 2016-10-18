// necessary files and npm packages
var tPass = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
// variable that holds user requested action
var action = process.argv[2];
// variable that holds user selected movie or track
var selection = [];
// twitter name to get tweets for
var tID = 'warrehz';

// pushes user inputs that are more than one word into an array
for (var i = 3; i < process.argv.length; i++) {

  selection.push(process.argv[i]);

}

// turns array into string and replaces commas with spaces
selection = selection.toString();
selection = selection.replace(/,/g, ' ');

// necessary keys and secrets to utilize the twitter api
var client = new Twitter({
  consumer_key: tPass.tKeys.consumer_key,
  consumer_secret: tPass.tKeys.consumer_secret,
  access_token_key: tPass.tKeys.access_token_key,
  access_token_secret: tPass.tKeys.access_token_secret
});

// function to get my most recent 20 tweets
var getTweets = function() {

  return client.get('/statuses/user_timeline', screen_name=tID, function(err, tweets, response) {

    if (err) throw err;

    for (var i = 0; i < tweets.length; i++) {

      console.log("\n#" + (i+1) + "\n" + "Tweet: " + tweets[i].text + "\nCreated on: " + tweets[i].created_at + "\n--------------------------------------------------\n");

    }

  })

};

// function to get artist information using spotify api
var spotifySong = function(x) {

  return spotify.search({ type: 'track', query: x }, function(err, data) {

    if (err) throw err;

    for (var j = 0; j < 5; j++) {

      console.log('Artist: ' + data.tracks.items[j].artists[0].name);
      console.log('Song Name: ' + data.tracks.items[j].name);
      console.log('Preview Link: ' + data.tracks.items[j].preview_url);
      console.log('Album: ' + data.tracks.items[j].album.name);
      console.log('---------------------------------------------------------------------------------------------------------------\n');

    }

  })

};

// function to get information about a movie using omdb api
var movieThis = function(x) {

  request('http://www.omdbapi.com/?t=' + x + '&y=&plot=short&r=json', function (err, response, body) {

    if (!err && response.statusCode == 200) {

      var json = JSON.parse(body);

      console.log('Title: ' + json.Title);
      console.log('Release Date: ' + json.Released);
      console.log('IMDB Rating: ' + json.imdbRating);
      console.log('Produced In: ' + json.Country);
      console.log('Languages: ' + json.Language);
      console.log('Plot: ' + json.Plot);
      console.log('Actors: ' + json.Actors);
      console.log('Metascore: ' + json.Metascore);

    }

  })

};

// function that uses fs node package to call a command based on what's in random.txt
var random = function() {

  var data = fs.readFileSync('random.txt');

  data = data.toString();

  var action = data.substring(0, data.indexOf(','));

  var selection = data.substring(data.indexOf('"'), data.length);

  return [action, selection];

};

// logic to run function based on user choice
if (action == 'my-tweets') {

  getTweets();

}
else if (action == 'movie-this') {

  movieThis(selection);

}
else if (action == 'spotify-this-song') {

  spotifySong(selection);

}
else if (action == 'do-what-it-says') {

  random();

} else {

  console.log('Oops, try again.');

}
