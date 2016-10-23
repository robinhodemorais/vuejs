var gulp = require('gulp');

gulp.task('default', function () {
    //copia as fonts de todas as pastas que existir
    gulp.src('./node_modules/materialize-css/fonts/roboto/**/*')
        //informa o que fazer
        .pipe(gulp.dest('./dist/fonts/roboto'));
});