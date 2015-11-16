var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetIndex = require('../models/index');

router.get('/', function (req, res) {

 	tweetIndex.Tweet.findAll().then(function(tweets){
 		return tweets
}).then(function(tweets){
	console.log(JSON.stringify(tweets))
	res.render('index', {title: "twitter.sql", tweets: tweets});
});
 		

	// res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
});

// function getTweet (req, res){

//   res.render('index', { tweets: tweets });
// }

// router.get('/users/:name', getTweet);
// router.get('/users/:name/tweets/:id', getTweet);

// // note: this is not very REST-ful. We will talk about REST in the future.
// router.post('/submit', function(req, res) {
//   var name = req.body.name;
//   var text = req.body.text;

//   res.redirect('/');
// });

module.exports = router;