(function() {
  'use strict';

  module.exports = function (grunt) {
    // Read in User Config
    var userConfig = grunt.file.readYAML('config.yml');

    // Grunt task configuration
    grunt.initConfig({
      // Server
      connect: {
        server: {
          options: {
            port: userConfig.server.port,
            livereload: userConfig.server.livereload,
            base: '.'
          }
        }
      },
      open: {
        launch: {
          path: 'http://localhost:' + userConfig.server.port
        }
      },
      // Watch
      watch: {
        options: {
          livereload: userConfig.server.livereload
        },
        scripts: {
          files: [userConfig.dirs.scripts + '/**/*.js'],
          tasks: ['jshint']
        },
        images: {
          files: [userConfig.dirs.images + '/**/*']
        },
        css: {
          files: [userConfig.dirs.css + 'css/**/*.css']
        },
        html: {
          files: [
            userConfig.dirs.root + '/**/*.html',
            '!node_modules'
          ]
        }
      },
      // JSHint
      jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        all: [
          userConfig.dirs.scripts + '/**/*.js',
          '!' + userConfig.dirs.scripts + '/**/*.min.js'
        ]
      }


    });

    // Use matchdep to load all Grunt tasks from package.json
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    //////////////////////////////
    // Server Task
    //////////////////////////////
    grunt.registerTask('server', function () {
      var launch = grunt.option('launch');
      grunt.task.run(['connect:server']);

      if (launch === true) {
        grunt.task.run(['open:launch']);
        console.log('Launching your website');
      }

      grunt.task.run(['watch']);


    });

    //////////////////////////////
    // Default Task
    //////////////////////////////
    grunt.registerTask('default', function () {
      console.log('This runs when you run `grunt`');
    });
  };
}());