// Generated by CoffeeScript 1.10.0
(function() {
  module.exports = function(grunt) {
    var dest, gruntOptions, repo, repos;
    repos = ['cloudinary-core', 'cloudinary-core-shrinkwrap', 'cloudinary-jquery', 'cloudinary-jquery-file-upload'];
    gruntOptions = {
      pkg: grunt.file.readJSON('package.json'),
      coffee: {
        options: {
          bare: true,
          sourceMap: true
        },
        sources: {
          cwd: 'src',
          expand: true,
          src: ['**/*.coffee'],
          dest: 'src',
          ext: '.js'
        },
        test: {
          expand: true,
          cwd: 'test/spec',
          src: ['*.coffee'],
          dest: 'test/spec',
          ext: '.js'
        },
        build: {
          expand: true,
          bare: false,
          sourceMap: true,
          cwd: 'build',
          src: ['*.coffee'],
          dest: 'build',
          ext: '.js'
        },
        legacy: {
          expand: false,
          bare: false,
          sourceMap: true,
          cwd: '.',
          src: 'js/jquery.cloudinary.coffee',
          dest: 'js/jquery.cloudinary.js',
          ext: '.js'
        }
      },
      uglify: {
        build: {
          options: {
            sourceMap: true,
            mangle: false
          },
          files: (function() {
            var i, len, results;
            results = [];
            for (i = 0, len = repos.length; i < len; i++) {
              repo = repos[i];
              results.push({
                src: ["build/" + repo + ".js"],
                dest: "build/" + repo + ".min.js",
                ext: '.min.js'
              });
            }
            return results;
          })()
        }
      },
      karmaCommon: ["build/<%= grunt.task.current.target %>.js", 'test/spec/cloudinary-spec.js', 'test/spec/transformation-spec.js', 'test/spec/tagspec.js', 'test/spec/videourlspec.js', 'test/spec/chaining-spec.js', 'test/spec/conditional-transformation-spec.js'],
      karma: {
        options: {
          reporters: ['dots'],
          configFile: 'karma.coffee',
          browserDisconnectTolerance: 3
        },
        'cloudinary-core': {
          files: {
            src: ["bower_components/lodash/lodash.js", "<%= karmaCommon %>"]
          }
        },
        'cloudinary-core-shrinkwrap': {
          files: {
            src: ["<%= karmaCommon %>"]
          }
        },
        'cloudinary-jquery': {
          files: {
            src: ["bower_components/jquery/dist/jquery.js", "<%= karmaCommon %>"]
          }
        },
        'cloudinary-jquery-file-upload': {
          files: {
            src: ["bower_components/jquery/dist/jquery.js", "bower_components/jquery.ui/ui/widget.js", "bower_components/blueimp-file-upload/js/jquery.fileupload.js", "bower_components/blueimp-file-upload/js/jquery.fileupload-process.js", "bower_components/blueimp-file-upload/js/jquery.iframe-transport.js", "bower_components/blueimp-file-upload/js/jquery.fileupload-image.js", "<%= karmaCommon %>", "test/spec/cloudinary-jquery-upload-spec.js"]
          }
        }
      },
      jsdoc: {
        options: {
          template: 'template',
          configure: "jsdoc-conf.json"
        },
        'cloudinary-core': {
          options: {
            destination: "doc/pkg-<%=grunt.task.current.target%>"
          },
          src: ["build/<%=grunt.task.current.target%>.js", './README.md']
        },
        'cloudinary-jquery': {
          options: {
            destination: "doc/pkg-<%=grunt.task.current.target%>"
          },
          src: ["build/<%=grunt.task.current.target%>.js", './README.md']
        },
        'cloudinary-jquery-file-upload': {
          options: {
            destination: "doc/pkg-<%=grunt.task.current.target%>"
          },
          src: ["build/<%=grunt.task.current.target%>.js", './README.md']
        }
      },
      clean: {
        build: ["build/*", "!build/lodash*"],
        doc: ["doc"],
        js: ["js"]
      },
      copy: {
        'backward-compatible': {
          files: [
            {
              expand: true,
              flatten: true,
              src: ["bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.min.js", "bower_components/blueimp-load-image/js/load-image.all.min.js", "bower_components/blueimp-file-upload/js/jquery.fileupload-image.js", "bower_components/blueimp-file-upload/js/jquery.fileupload-process.js", "bower_components/blueimp-file-upload/js/jquery.fileupload-validate.js", "bower_components/blueimp-file-upload/js/jquery.fileupload.js", "bower_components/blueimp-file-upload/js/jquery.iframe-transport.js", "bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js"],
              dest: "js/"
            }, {
              src: 'build/cloudinary-jquery-file-upload.coffee',
              dest: 'js/jquery.cloudinary.coffee'
            }
          ]
        },
        dist: {
          files: (function() {
            var i, len, results;
            results = [];
            for (i = 0, len = repos.length; i < len; i++) {
              repo = repos[i];
              dest = /shrinkwrap/.test(repo) ? "cloudinary-core" : repo;
              results.push({
                'cwd': 'build',
                'src': [repo + ".js", repo + ".min.js", repo + ".min.js.map"],
                'dest': "../pkg/pkg-" + dest + "/",
                'expand': true
              });
            }
            return results;
          })()
        },
        doc: {
          files: (function() {
            var i, len, results;
            results = [];
            for (i = 0, len = repos.length; i < len; i++) {
              repo = repos[i];
              if (!/shrinkwrap/.test(repo)) {
                results.push({
                  expand: true,
                  cwd: "doc/pkg-" + repo + "/",
                  src: ["**"],
                  dest: "../pkg/pkg-" + repo + "/"
                });
              }
            }
            return results;
          })()
        }
      },
      version: {
        options: {
          release: 'patch'
        },
        "package": {
          src: ['bower.json', 'package.json']
        },
        source: {
          options: {
            prefix: 'VERSION\\s+=\\s+[\'"]'
          },
          src: ['src/cloudinary.coffee']
        },
        dist: {
          files: (function() {
            var i, len, results;
            results = [];
            for (i = 0, len = repos.length; i < len; i++) {
              repo = repos[i];
              if (!/shrinkwrap/.test(repo)) {
                results.push({
                  src: ["../pkg/pkg-" + repo + "/bower.json", "../pkg/pkg-" + repo + "/package.json"],
                  dest: "../pkg/pkg-" + repo + "/"
                });
              }
            }
            return results;
          })()
        }
      },
      srcList: ['src/utf8_encode.coffee', 'src/crc32.coffee', 'src/parameters.coffee', 'src/condition.coffee', 'src/transformation.coffee', 'src/configuration.coffee', 'src/tags/htmltag.coffee', 'src/tags/imagetag.coffee', 'src/tags/videotag.coffee', 'src/layer/layer.coffee', 'src/layer/Textlayer.coffee', 'src/layer/Subtitleslayer.coffee', 'src/cloudinary.coffee'],
      concat: {
        options: {
          dest: "build/<%= grunt.task.current.target %>.coffee",
          banner: "###*\n * Cloudinary's JavaScript library - Version <%= pkg.version %>\n * Copyright Cloudinary\n * see https://github.com/cloudinary/cloudinary_js\n *\n###\n\n((root, factory) ->\n  if (typeof define == 'function') && define.amd\n    define  <%= /jquery/.test(grunt.task.current.target) ? \"['jquery'],\" : (/shrink/.test(grunt.task.current.target) ? \"\" : \"['lodash'],\" )%> factory\n  else if typeof exports == 'object'\n    module.exports = factory(<%= /jquery/.test(grunt.task.current.target) ? \"require('jquery')\" : (/shrink/.test(grunt.task.current.target) ? \"\" : \"require('lodash')\")%>)\n  else\n    root.cloudinary ||= {}\n    for name, value of factory(<%=/jquery/.test(grunt.task.current.target) ? \"jQuery\" : (/shrink/.test(grunt.task.current.target) ? \"\" : \"_\")%>)\n      root.cloudinary[name] = value\n)(this,  (<%=/jquery/.test(grunt.task.current.target) ? \"jQuery\" : (/shrink/.test(grunt.task.current.target) ? \"\" : \"_\")%>)->\n",
          footer: "\n  cloudinary =\n    utf8_encode: utf8_encode\n    crc32: crc32\n    Util: Util\n    Condition: Condition\n    Transformation: Transformation\n    Configuration: Configuration\n    HtmlTag: HtmlTag\n    ImageTag: ImageTag\n    VideoTag: VideoTag\n    Layer: Layer\n    TextLayer: TextLayer\n    SubtitlesLayer: SubtitlesLayer\n    Cloudinary: Cloudinary\n    VERSION: \"<%= pkg.version %>\"\n    <%=  /jquery/.test(grunt.task.current.target) ? \"CloudinaryJQuery: CloudinaryJQuery\" : \"\"%>\n\n  cloudinary\n)",
          process: function(src, path) {
            return "  " + src.replace(/\n/g, "\n  ");
          }
        },
        'cloudinary-core': {
          src: ["src/util/lodash.coffee", "<%= srcList%>"],
          dest: "build/cloudinary-core.coffee"
        },
        'cloudinary-core-shrinkwrap': {
          src: ["build/lodash-shrinkwrap.coffee", "src/util/lodash.coffee", "<%= srcList%>"],
          dest: "build/cloudinary-core-shrinkwrap.coffee"
        },
        'cloudinary-jquery': {
          src: ["src/util/jquery.coffee", "<%= srcList%>", "src/cloudinaryjquery.coffee"],
          dest: "build/cloudinary-jquery.coffee"
        },
        'cloudinary-jquery-file-upload': {
          src: ["src/util/jquery.coffee", "<%= srcList%>", "src/cloudinaryjquery.coffee", "src/jquery-file-upload.coffee"],
          dest: "build/cloudinary-jquery-file-upload.coffee"
        }
      }
    };
    grunt.initConfig(gruntOptions);
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-version');
    grunt.registerTask('default', ['concat', 'coffee']);
    grunt.registerTask('compile', ['clean:build', 'clean:js', 'concat', 'copy:backward-compatible', 'coffee', 'copy:dist']);
    grunt.registerTask('build', ['clean', 'concat', 'copy:backward-compatible', 'coffee', 'jsdoc']);
    return grunt.registerTask('lodash', function(name, target) {
      var func, i, include, len, lodashCalls;
      lodashCalls = grunt.file.read('src/util/lodash.coffee').match(/_\.\w+/g);
      include = [];
      for (i = 0, len = lodashCalls.length; i < len; i++) {
        func = lodashCalls[i];
        if (include.indexOf(func.slice(2)) < 0) {
          include.push(func.slice(2));
        }
      }
      return require('lodash-cli')(["include=" + (include.join(',')), "exports=none", "iife=var lodash = _ = (function() {%output%; \nreturn lodash;\n}.call(this));", "--output", "build/lodash-shrinkwrap.js", "--development"], function(data) {
        var outputPath, sourceMap;
        outputPath = data.outputPath;
        sourceMap = data.sourceMap;
        if (outputPath) {
          grunt.file.write(outputPath, data.source);
          grunt.file.write(outputPath.slice(0, -3) + ".coffee", "\n`" + (data.source.replace(/`/g, "'")) + "`");
          if (sourceMap) {
            return grunt.file.write(path.join(path.dirname(outputPath), path.basename(outputPath, '.js') + '.map'), sourceMap);
          }
        }
      });
    });
  };

}).call(this);
