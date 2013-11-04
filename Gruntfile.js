(function() {
  'use strict';

  module.exports = function (grunt) {
    // Grunt task configuration
    grunt.initConfig({
      // Server
      connect: {
        server: {
          options: {
            port: 9001,
            livereload: 9002,
            base: '.'
          }
        }
      },
      open: {
        launch: {
          path: 'http://localhost:9001'
        }
      },
      // Watch
      watch: {
        options: {
          livereload: 9002
        },
        scripts: {
          files: ['js/**/*.js']
        },
        images: {
          files: ['img/**/*']
        },
        css: {
          files: ['css/**/*.css']
        },
        html: {
          files: [
            './**/*.html',
            '!node_modules'
          ]
        }
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