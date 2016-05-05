var assert = require('assert');
var chron = require('./chron')
var dictionary = require('./dictionary')
var Chain = require('markov-chains').default;

describe('Dictionary',function(){
  it('should be an array',function(){
    assert(Array.isArray(dictionary),'the dictionary is not an array')
  });
  it('should be non-empty',function(){
    assert(dictionary.length > 0, 'the dictionary is empty')
  });
});

describe('Markov',function(){
  var chain = new Chain(dictionary)
  var markov = chain.walk()

  it('should be unique',function(){
    assert(dictionary.indexOf(markov) < 0,'the generated markov is not original')
  });
})
