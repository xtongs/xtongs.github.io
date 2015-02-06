module.exports = function(grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            "options": {
                "banner": '/*! vipshop .inc script.min.js */'
            },
            "my_target": {
                "files": {
                    'assets/script.min.js': ['src/script/lib/*.js', 'src/script/*.js']
                }
            }
        },
        cssmin: {
            compress: {
                files: {
                    'assets/style.min.css': [
                        "src/style/*.css"
                    ]
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/image',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['src/script/**/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            styles: {
                files: ['src/style/**/*.css'],
                tasks: ['cssmin'],
                options: {
                    spawn: false
                }
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
    grunt.registerTask('default', ['uglify', 'cssmin', 'imagemin', 'watch']);
    grunt.event.on('watch', function(action, filepath, target) {
        switch (target) {
            case 'scripts':
                filepath = 'script.min.js';
                break;
            case 'styles':
                filepath = 'style.min.css';
                break;
            default:
                filepath = filepath.split('\\').pop();
        }
        grunt.file.write(
            'index.html',
            grunt.file.read(
                'index.html', {
                    encoding: 'UTF-8'
                }
            ).replace(
                eval('/' + filepath + '(\\?t=\\d*)?/gi'),
                filepath + '?t=' + new Date().getTime()
            ), {
                encoding: 'UTF-8'
            }
        )
    });
}