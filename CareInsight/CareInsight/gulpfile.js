var gulp = require('gulp'),
    deletefile = require('gulp-delete-file');


gulp.task('copyTestData', function() {
   gulp.src('./js/TestPopulationAnalyzerData.json')
   .pipe(gulp.dest('./build/'));
})

gulp.task('cleanBuildDirectory', function(){
    var regexp = '^[A-Za-z-]*\.json$'
    gulp.src('./build/*')
     .pipe(deletefile({
        deleteMatch: true,
        reg: regexp
    }))
})