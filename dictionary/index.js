var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';

var index = [];

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-4) === '.txt');
  })
  .forEach(function(file) {
    console.log("file:",__dirname+'/'+file)

    var split = {
      word: /\b[\s\W]+\b/gi,
      whitespace: /\s+/gi,
      boundary: /\b(?![\?\.\!])/gi,
      newline: /[\n\r]+/gi,
      sentence: /([^\.!\?]{12,}[\.!\?]+)/gi
    }

    var data = fs.readFileSync(__dirname+'/'+file)

    var processedData = data.toString().replace(/\r\n/gi," ").split(split.sentence).filter(sentence => { // filter out undesirable sentences
      var test = /\w{2,}/gi.test(sentence)
      return test && sentence.length >= 24
    })
    .map(sentence => {
      var processedSentence = sentence.trim().split(split.whitespace)
      // console.log(processedSentence)
      // console.log('\n\n' + processedSentence.join(''))
      return processedSentence
    }) // split each line by word boundary
    for(s in processedData) {
      index.push(processedData[s]); // push array to index
    }
    console.log(index.length)

});

module.exports = index
