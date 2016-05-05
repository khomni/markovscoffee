// statusUpdate
var fs = require('fs');

var timexe = require('timexe');
var Chain = require('markov-chains').default;

var statusUpdate = function(app) {
  console.log('[CHRON] statusUpdate scheduled');
  var dictionary = require(appRoot + '/dictionary')
  var chain = new Chain(dictionary);

  var client = app.get('config').twitter

  var Tweet = function(body) {
    this.body = body;
    this.validate = function(){
      return this.body && (this.body.length <= 140) && (this.body.length >= 3) && this.depth === 0
    };
    this.format = function(){
      this.body = this.body.slice(this.body.search(/\S*\w+.\S*/))
      this.body = this.body[0].toUpperCase() + this.body.slice(1);
      this.depth = 0;
      for(c in this.body) {
        if (this.body[c] ==='(') this.depth++
        if (this.body[c] ===')') this.depth--
      }
      while(this.depth>0) {
        this.body = [body.slice(0, -1), ')', this.body.slice(-1)].join('');
        console.log('[FORMAT] adding parenthasis:',this.body)
        this.depth--
      }
      return this
    }
    this.addHashtags = function() {
      // TODO: hashtags
      return this
    }
  }
  var frequency = "* * * /4"
  debugger;
  timexe("* * * /4", function() {

    var coffeeMarkov = null

    var attempts = 0
    do {
      attempts++
      coffeeMarkov = new Tweet(chain.walk().join(' '));
      coffeeMarkov.format()
    }
    while(!coffeeMarkov.validate());

    console.log("["+coffeeMarkov.body.length+"]",coffeeMarkov.body);
    debugger;

    if(process.env.NODE_ENV === 'production') {
      client.post('statuses/update', {status: coffeeMarkov}, function(error, tweet, response) {
        if(error){
          console.error(error);
        }
        console.log(tweet);
      })
    }

  });
}

module.exports = statusUpdate
