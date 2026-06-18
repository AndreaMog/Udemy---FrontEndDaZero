const gulp = require("gulp");
const { watchJs } = require("./jsTasks");
const series = gulp.series;
const viewTasks = require("./viewTasks");
const jsTasks = require("./jsTasks");
const serveTasks = require("./serveTasks");
const fs = require("fs");
const paths = require("./paths");

const clean = function(cb) {
    // Cancella la cartella dist in modo sicuro e nativo
    fs.rmSync(paths.getDistFolder(), { recursive: true, force: true });
    cb();
}

const dev = series(
    clean,
    viewTasks.compileIndex, 
    jsTasks.bundleJs, 
    jsTasks.watchJs, 
    viewTasks.watchIndex, 
    serveTasks.serve
    );

module.exports = {
    dev: dev
}