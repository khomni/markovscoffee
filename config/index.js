var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';

var index = {}

fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var fileName = file.split('.')[0]
    var allEnv =  require('./'+file)
    var fileConfig = allEnv[env] || allEnv['default'] || allEnv
    index[fileName] = fileConfig;
  });

module.exports = index
