const cluster = require('cluster');

const { 
    argv: { port, address, workers } 
} = require('./cli');

if(cluster.isMaster) {
    console.log(`[master] Démarrage de ${workers} esclaves...`)

    for(let i = 0; i < workers; i++) {
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

