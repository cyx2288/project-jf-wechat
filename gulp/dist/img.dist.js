/**图片压缩
 * 交付*/


var gulp = require('gulp');

function distImg() {
    

    gulp.src('build/images/**/*.{png,jpg,gif,ico}')

        .pipe(gulp.dest('dist/images'));

    gulp.src("build/icon/*.*")

        .pipe(gulp.dest('dist/icon'))
    
}

module.exports = distImg;