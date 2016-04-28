var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';

var index = [
  '','',''
];

module.exports = index
