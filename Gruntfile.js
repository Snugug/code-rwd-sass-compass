(function() {
  'use strict';

  var _ = require('underscore');

  module.exports = function (grunt) {
    // Read in User Config
    var userConfig = grunt.file.readYAML('config.yml');

    var extensions = [];
    _.forEach(userConfig.compass.dependencies, function(v, e) {
      extensions.push(e);
    });

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
          files: [userConfig.dirs.css + '/**/*.css']
        },
        sass: {
          files: [userConfig.dirs.sass + '/**/*.scss'],
          tasks: ['compass:dev'],
          options: {
            livereload: false
          }
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
      },
      // Compass
      compass: {
        options: {
          sassDir: userConfig.dirs.sass,
          cssDir: userConfig.dirs.css,
          imagesDir: userConfig.dirs.images,
          javascriptsDir: userConfig.dirs.scripts,
          fontsDir: userConfig.dirs.fonts,
          relativeAssets: userConfig.compass.relative_assets,
          require: extensions,
          importPath: userConfig.compass.import_paths,
          bundleExec: true
        },
        dev: {
          options: {
            environment: 'development'
          }
        }
      },
      //Exec
      exec: {
        bundler: {
          command: 'bundle install',
          stdout: true,
          stderr: true
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
      grunt.task.run(['bundler', 'connect:server']);

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

    //////////////////////////////
    // Bundler Task
    //////////////////////////////
    grunt.registerTask('bundler', function () {
      var gemfileContent = '# Pull gems from RubyGems\nsource "https://rubygems.org"\n';

      _.forEach(userConfig.compass.dependencies, function(v, e) {
          gemfileContent += 'gem "' + e + '", "' + v + '"\n';
      });

      grunt.file.write(userConfig.dirs.root + '/Gemfile', gemfileContent);

      grunt.task.run(['exec:bundler']);
    });
  };
}());