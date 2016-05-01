// statusUpdate
var fs = require('fs');

var timexe = require('timexe');
var Chain = require('markov-chains').default;

var statusUpdate = function(app) {
  console.log('[CHRON] statusUpdate scheduled');
  var dictionary = require(appRoot + '/dictionary')
  // console.log(dictionary)
  var chain = new Chain(dictionary);
  // console.log(dictionary)

  timexe("* * * * * /" + app.get('interval'), function() {
    var now = new Date()
    console.log('['+now.toString().split(' ')[4]+']', chain.walk().join(' '))
  });

  var client = app.get('config').twitter
  timexe("* * * 12",function(){
    var coffeeMarkov = null // TODO: markov
    client.post('statuses/update', {status: coffeeMarkov}, function(error, tweet, response) {
      if(error){
        console.error(error);
      }
      console.log(tweet);
    })
  });
}

module.exports = statusUpdate
