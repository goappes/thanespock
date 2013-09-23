var path = require('path'),
    basename = path.basename,
    fs = require('fs');

/**
 * Auto-load bundled middleware
 */
fs.readdirSync(__dirname).forEach(function (filename){
  if (!/\.js$/.test(filename)) return;
  var name = basename(filename, '.js');
  function load(){ return require('./' + name); }
  exports.__defineGetter__(name, load);
});
