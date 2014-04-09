/*
 * grunt-kanlo-update
 * 
 *
 * Copyright (c) 2014 Felipe Morais
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    kanlo_auth: grunt.file.readJSON('bseller-auth.json'),

    kanlo_update: {
      options:{
        store: '<%= kanlo_auth.store %>',
        username: '<%= kanlo_auth.username %>',
        password: '<%= kanlo_auth.password %>'
      },
      pull: {
        options: {
          method: 'pull.js',
          componentsDir: './componentes'
        }
      },
      push: {
        options: {
          method: 'push.js',
          componentsDir: './componentes'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'kanlo_update', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
