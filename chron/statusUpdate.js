// statusUpdate
var fs = require('fs');

var timexe = require('timexe');
var Chain = require('markov-chains').default;

var statusUpdate = function(app) {
  console.log('[CHRON] statusUpdate scheduled');
  var dictionary = require(appRoot + '/dictionary').map(function(sentence){return sentence.split(' ')})
  var chain = new Chain(dictionary);
  var phrase = chain.walk();
  console.log(phrase.join(' '))

  timexe("* * * 12",function(){
    var coffeeMarkov = null // TODO: markov
    var client = app.get('twitter').client
    client.post('statuses/update', {status: coffeeMarkov}, function(error, tweet, response) {
      if(error){
        console.error(error);
      }
      console.log(tweet);
    })
  });
}

module.exports = statusUpdate
