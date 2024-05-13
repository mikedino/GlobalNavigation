'use strict';

const build = require('@microsoft/sp-build-web');

// supress the CSS camelCase warning so we can create the package
build.addSuppression(/^.*The local CSS class(.*)is not camelCase and will not be type-safe\.$/);  

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));
