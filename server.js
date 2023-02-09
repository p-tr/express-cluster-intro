//require('dotenv').config()

// usage : node server.js --port=8000 --address=0.0.0.0

const yargs = require('yargs/yargs');

const { argv } = yargs(process.argv.slice(2))
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

const { port, address } = argv;

const cluster = require('cluster');
const os = require('os');

if(cluster.isMaster) {
    const nr_cpus = os.cpus().length;

    for(let i = 0; i < nr_cpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (slave, code, signal) => {
        console.log(`L'esclave ${slave.process.pid} est mort...`);
    });
} else {
    const app = require('./app')

    console.log(`Mise en ligne de l'esclave ${process.pid}...`);

    app.listen(port, address, () => {
        console.log(`Esclave ${process.pid} en ligne et à l'écoute sur ${address}:${port}`)
    })
}

