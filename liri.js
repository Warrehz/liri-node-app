// necessary files and npm packages
var tPass = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var tID = 'warrehz';

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
var spotifySong = function(songSearch) {

  return spotify.search({ type: 'track', query: songSearch }, function(err, data) {

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

spotifySong("The Sign");
