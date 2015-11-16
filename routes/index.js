var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetIndex = require('../models/index');

router.get('/', function (req, res) {

 	tweetIndex.Tweet.findAll( {include: [tweetIndex.User]}).then(function(tweets){
 		return tweets
}).then(function(tweets){
	res.render('index', {title: "twitter.sql", tweets: tweets});
	});
});

function getTweet (req, res){
	tweetIndex.Tweet.findAll({include:[ tweetIndex.User], where :{ User : req.params } }).then(function(tweets){
 		return tweets;
}).then(function(tweets){
	console.log(req.params)
	// console.log(JSON.stringify(tweets));

	res.render('index', {title: "twitter.sql", tweets: tweets});
});
}

router.get('/users/:name', getTweet);
// router.get('/users/:name/tweets/:id', getTweet);

// // note: this is not very REST-ful. We will talk about REST in the future.
// router.post('/submit', function(req, res) {
//   var name = req.body.name;
//   var text = req.body.text;

//   res.redirect('/');
// });

module.exports = router;

// {where: req.params }