const browserSync = require("browser-sync").create();
const paths = require('./paths');
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const serve = function (cb) {
    // 1. Leggiamo i parametri del terminale con la sintassi moderna
    const args = yargs(hideBin(process.argv)).argv;
    const prod = args.prod;
    const debug = args.debug;

    // 2. Se siamo in produzione, eseguiamo subito la callback e usciamo!
    if (prod && !debug) {
        return cb();
    }

    // 3. Altrimenti (se siamo in dev), facciamo partire il watch normalmente
    browserSync.init({
        watch: true,
        server: {
            baseDir: paths.getDistFolder()
        }
    });
}

module.exports = {
    serve: serve
}