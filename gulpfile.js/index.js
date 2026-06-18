const gulp = require("gulp");
const { watchJs } = require("./jsTasks");
const series = gulp.series;
const viewTasks = require("./viewTasks");
const jsTasks = require("./jsTasks");
const serveTasks = require("./serveTasks");

const dev = series(
        viewTasks.compileIndex, 
        jsTasks.copyJs, 
        jsTasks.watchJs, 
        viewTasks.watchIndex, 
        serveTasks.serve
    );

module.exports = {
    dev: dev
}