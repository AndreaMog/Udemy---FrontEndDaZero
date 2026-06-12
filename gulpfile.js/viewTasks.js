const gulp = require("gulp");
const inject = require("gulp-inject");

const compileIndex = function (){
    // 1. Prendiamo il file JavaScript che vogliamo "iniettare" nell'HTML
    const jsIndex = gulp.src("./src/js/index.js");
    const utilsIndex = gulp.src("./src/js/utils.js");
    const modelsIndex = gulp.src("./src/js/models/Wallet.js");

    // 2. Apriamo il rubinetto sul file HTML originale
    return gulp.src("./src/index.html")

        // 3. Colleghiamo il tubo a "gulp-inject". 
        // Gli passiamo il file JS e gli diciamo: "Cerca il tag con nome 'custom'"
        .pipe(inject(jsIndex, { relative: true, name: "custom" }))
        .pipe(inject(utilsIndex, { relative: true, name: "custom:utils" }))
        .pipe(inject(modelsIndex, { relative: true, name: "custom:models" }))

        // 4. Mandiamo il risultato finale (l'HTML con il tag inserito) nella cartella ./dist
        .pipe(gulp.dest("./dist"));

}

module.exports = {
    compileIndex: compileIndex
}