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

// supress "filename should end with module.sass or module.scss" warning.  The only way to import the custom
// bootstrap file is to remove "module" from the filename but it will not package with the warning
build.sass.setConfig({ warnOnNonCSSModules: false, useCssModules:true });