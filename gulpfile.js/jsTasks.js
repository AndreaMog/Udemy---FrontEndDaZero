const gulp = require("gulp");
const paths = require("./paths");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const gulpIf = require("gulp-if");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");

const bundleJs = function() {
    return browserifyBundle()
        .pipe(gulp.dest(paths.getJsOutputPath()));
};

const browserifyBundle = function() {
    // Generiamo l'oggetto args correttamente leggendo il terminale
    const args = yargs(hideBin(process.argv)).argv;
    const prod = args.prod;
    const debug = args.debug;

    return browserify({
        entries: paths.getJsEntryPath(),
        debug: debug === true
    })
    .bundle()
    .pipe(source(paths.getJsOutputEntry()))
    .pipe(buffer())
    // Inizializza le sourcemaps leggendo la mappa pre-esistente di Browserify
    .pipe(gulpIf(debug, sourcemaps.init({ loadMaps: true })))
    
    // Se siamo in produzione, minifica il codice
    .pipe(gulpIf(prod, uglify()))
    
    // 🌟 Aggiunto l'ultimo pipe: scrive il file .map nella stessa cartella del JS
    .pipe(gulpIf(debug, sourcemaps.write("./")));
}

const watchJs = function(cb) {
    // 1. Leggiamo i parametri del terminale con la sintassi moderna
    const args = yargs(hideBin(process.argv)).argv;
    const prod = args.prod;

    // 2. Se siamo in produzione, eseguiamo subito la callback e usciamo!
    if (prod) {
        return cb();
    }

    // 3. Altrimenti (se siamo in dev), facciamo partire il watch normalmente
    gulp.watch(paths.getJsSrcPath("**/*"), bundleJs);
    cb();
}

module.exports = {
    bundleJs: bundleJs,
    watchJs: watchJs
}