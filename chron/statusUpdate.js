// statusUpdate
var timexe = require('timexe');


var statusUpdate = function(app) {
  console.log('statusUpdate scheduled')
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
