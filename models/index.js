
// pull in the Sequelize library
var Sequelize = require('sequelize');
// create an instance of a database connection
// which abstractly represents our app's mysql database
var twitterjsDB = new Sequelize('twitterjs', 'root', null, {
    dialect: "mysql",
    port:    3306,
});

var Tweet = require('./tweet')(twitterjsDB);
var User = require('./users')(twitterjsDB);
// open the connection to our database
twitterjsDB
  .authenticate()
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  })
  .then(function() {
    console.log('Connection has been established successfully.');
  });

module.exports = {
    User: User,
    Tweet: Tweet
};


// adds a UserId foreign key to the `Tweet` table
User.hasMany(Tweet);
Tweet.belongsTo(User);

User.findAll( {include : [Tweet] })
.then(function (tweet) {
    // big old crazy object, but no name or
    // id anywhere in there
    //console.log(tweet[0]);
    console.log(tweet[0].dataValues.Tweets[0].dataValues.tweet);
    //var JSONstringified = JSON.stringify(tweet);
});

// Tweet.findOne()
// .then(function ())
