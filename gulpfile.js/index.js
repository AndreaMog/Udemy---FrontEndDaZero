const gulp = require("gulp");
const { watchJs } = require("./jsTasks");
const series = gulp.series;
const viewTasks = require("./viewTasks");
const jsTasks = require("./jsTasks");

const dev = series(viewTasks.compileIndex, jsTasks.copyJs, jsTasks.watchJs, viewTasks.watchIndex /*, serve, watchHtml*/);

module.exports = {
    dev: dev
}