var Twitter = require('twitter');
client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var schedule = function() {

  timexe("* * * 12",function(){
    client.post('statuses/update', {status: 'I Love Twitter'}, function(error, tweet, response) {

    }
  })

}

module.exports = schedule
