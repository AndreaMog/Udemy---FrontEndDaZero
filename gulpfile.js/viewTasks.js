const gulp = require("gulp");
const inject = require("gulp-inject");
const paths = require("./paths");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const compileIndex = function (){
    // 1. Prendiamo il file JavaScript che vogliamo "iniettare" nell'HTML
    const jsIndex = gulp.src(paths.getJsEntryPath());

    // 2. Apriamo il rubinetto sul file HTML originale
    return gulp.src(paths.getHtmlEntryPath())

        // 3. Colleghiamo il tubo a "gulp-inject". 
        // Gli passiamo il file JS e gli diciamo: "Cerca il tag con nome 'custom'"
        .pipe(inject(jsIndex, { relative: true, name: "custom" }))
        
        // 4. Mandiamo il risultato finale (l'HTML con il tag inserito) nella cartella ./dist
        .pipe(gulp.dest(paths.getDistFolder()));
}

const watchIndex = function(cb) {
    const args = yargs(hideBin(process.argv)).argv;
    const prod = args.prod;

    if (prod) {
        return cb();
    }

    gulp.watch(paths.getHtmlEntryPath(), compileIndex);
    cb();
}

module.exports = {
    compileIndex: compileIndex,
    watchIndex: watchIndex
}