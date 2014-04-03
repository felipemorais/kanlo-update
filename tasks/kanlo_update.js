/*
 * grunt-kanlo-update
 * 
 *
 * Copyright (c) 2014 Felipe Morais
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('kanlo_update', 'Download and Upload Components to Kanlo', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      componentsDir: './componentes',
      method:''
    });

    var cp = require('child_process')
    , f = require('util').format
    , _ = grunt.util._
    , log = grunt.log
    , verbose = grunt.verbose
    , command = 'casperjs test '
    , childProcess
    , args = [].slice.call(arguments, 0).join(' ')
    , exitCodes = [0]
    , done = grunt.task.current.async();
    
    if(!options.method){
      log.error('[options.method] não defido.');
      return done(false);
    }
    command += ' ' + __dirname + '/../' + options.method;
    command += ' --store=' + options.store;
    command += ' --password=' + options.password 
    command += ' --username=' + options.username;
    command += ' --ids=' + args;
    
    verbose.writeln(command); 
    
    childProcess = cp.exec(command, {}, function(){});

    childProcess.stdout.on('data', function (d) {
      log.write(d); 
    });
    childProcess.stderr.on('data', function (d) { 
      log.error(d); 
    });

    childProcess.on('exit', function(code) {
      if (exitCodes.indexOf(code) < 0) {
        log.error(f('Exited with code: %d.', code));
        return done(false);
      }

      verbose.ok(f('Exited with code: %d.', code));
      done();
    });
    
  });

};
