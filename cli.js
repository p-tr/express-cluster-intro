const yargs = require('yargs/yargs');
const os = require('os');

module.exports = yargs(process.argv.slice(2))
    .option('port', {
        demandOption: false,
        default: 8000,
        describe: "Le numéro de port pour l'écoute du serveur",
        type: "number"
    })
    .option('address', {
        demandOption: false,
        default: '127.0.0.1',
        desribe: "L'adresse IP pour l'écoute du serveur",
        type: "string"
    })
    .option('workers', {
        demandOption: false,
        default: os.cpus().length,
        describe: "Nombre de processus esclaves à lancer",
        type: "number"
    })