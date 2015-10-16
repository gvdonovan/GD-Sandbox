var gulp = require('gulp');
var paths = require('../paths')();
var fs = require('fs');

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  
  if(fs.existsSync(paths.customTheme)){
    gulp.watch(paths.customTheme + 'scss/*.scss', ['sass']);
  }
  
});