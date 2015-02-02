module.exports = function (grunt) {
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      "options": {
        "banner": '/*! vipshop .inc script.min.js */'
      },
      "my_target": {
        "files": {
          'assets/script.min.js': ['src/script/lib/jquery.min.js', 'src/script/index.js']
        }
      }
    },
    cssmin: {
      compress: {
        files: {
          'assets/style.min.css': [
            "src/style/base.css",
            "src/style/style.css"
          ]
        }
      }
    },
    imagemin:{
      dynamic:{
        files:[{
          expand: true,
          cwd:    'src/image',
          src:    ['**/*.{png,jpg,gif}'],
          dest:   'assets/'
        }]
      }
    },
    watch: { 
      scripts: { 
        files: ['src/script/**/*.js'], 
        tasks: ['uglify'], 
        options: { spawn: false}
      },
      styles: { 
        files: ['src/style/**/*.css'], 
        tasks: ['cssmin'], 
        options: { spawn: false}
      },
      images: {
        files: ['src/image/**/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // 默认任务
  grunt.registerTask('default', ['uglify','cssmin','imagemin','watch']);
}