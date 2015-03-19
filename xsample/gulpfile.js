// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var inlinesource = require('gulp-inline-source');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// 合并，压缩css文件
gulp.task('style', function() {
    gulp.src('src/style/**/*.css')
        .pipe(plumber())
        .pipe(concat('style.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('src/dist'));
});

// 合并，压缩js文件
gulp.task('script', function() {
    gulp.src('src/script/**/*.js')
        .pipe(plumber())
        .pipe(concat('script.min.js'))
        .pipe(uglify({
            output : {
                'inline_script' : true,
                'max_line_len': 1000000
            }
        }))
        .pipe(gulp.dest('src/dist'));
});

// 压缩图片
gulp.task('image', function() {
    gulp.src('src/dist/**/*.{gif,jpg,png}')
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist'));
});

// 插入行内代码
gulp.task('inline', function () {
    setTimeout(function(){
        gulp.src('src/*.html')
            .pipe(inlinesource({
                compress: false
            }))
            .pipe(gulp.dest('./'))
            .pipe(reload({stream:true}));
    },1000);
});

// 自动刷新浏览器
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        },
        ui: false,
        notify: false,
        open: 'external',
        port: 80
    });
});

// 监听文件变化
gulp.task('watch', function () {
    gulp.watch('src/style/**/*.css', ['style','inline']);
    gulp.watch('src/script/**/*.js', ['script','inline']);
    gulp.watch('src/dist/**/*.{gif,jpg,png}', ['image']);
    gulp.watch('src/**/*.html', ['inline']);
});

// 默认任务
gulp.task('default', ['style', 'script', 'inline', 'watch', 'browser-sync']);