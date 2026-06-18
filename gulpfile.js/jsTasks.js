const gulp = require("gulp");
const paths = require("./paths");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

const bundleJs = function() {
    return browserifyBundle()
        .pipe(gulp.dest(paths.getJsOutputPath()));

};

const browserifyBundle = function() {
    return browserify({
        entries: paths.getJsEntryPath()
    })
    .bundle()
    .pipe(source(paths.getJsOutputEntry()))
    .pipe(buffer())
}

const watchJs = function(cb) {
    gulp.watch(paths.getJsSrcPath("**/*"), bundleJs);
    cb();
}

module.exports = {
    bundleJs: bundleJs,
    watchJs: watchJs
}