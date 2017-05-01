var gulp= require('gulp');
var sass= require('gulp-sass');
var autoprefixer= require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('default',['sass','copy-img','copy-html','browser-sync'], function(){
  console.log('hi');
  gulp.watch('src/scss/**/*.scss',['sass']);
  gulp.watch("src/js/**/*.js").on("change",browserSync.reload);
  gulp.watch('src/html/**/*.html').on("change", browserSync.reload);
});

gulp.task("browser-sync",function(){
 browserSync.init({
     server: {baseDir:"./"},

		 startPath: "./src/html/index.html",


 });
 });
gulp.task('sass',function(){
	gulp.src('src/scss/**/*.scss')
	.pipe(sass().on('error',sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
  }))
	.pipe(gulp.dest('./src/css'))
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('copy-img', function(){
  gulp.src('src/img/*')
  .pipe(gulp.dest('build/img'));

});

gulp.task('copy-html', function(){
  gulp.src('src/html/*')
  .pipe(gulp.dest('build/html'));

});

gulp.task('js', function(){
  gulp.src('src/js/*')
  .pipe(gulp.dest('build/js'));
});
