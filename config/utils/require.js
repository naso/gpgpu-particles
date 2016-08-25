var fs = require('fs')

var Require = {}

Require.nocache = function (module) {
  var m = require(module)
  delete require.cache[require.resolve(module)]
  return m
}

require.extensions['.md'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

module.exports = Require
