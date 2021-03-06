/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    'ember-prism': {
      'components': ['scss', 'javascript','handlebars'],
      'plugins': ['line-highlight']
    }
  });

  return app.toTree();
};
