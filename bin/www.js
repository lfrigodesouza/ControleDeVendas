'use strict';

const app = require('../src/app');
const http = require('http');
const config = require('../src/config');

// Obtêm a porta do ambiente
const port = normalizePort(process.env.PORT || config.defaultPort);
app.set('port', port);

// Cria o servidor HTTP
const server = http.createServer(app);

// Cria o listener na porta definida
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta ' + port);

// Função para normalizar a porta
function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

// Função para tratar os eventos onError
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // Mensagens para erros específicos
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' precisa de privilégios elevados');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' já está em uso');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Função para tratar eventos onListening
function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    // debug('Listening on ' + bind);
};
