const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors'); // Importar el paquete cors
const Sockets = require('./sockets');

class Server {
  constructor() {
    this.app = express();
    this.port = 8000;
    this.server = http.createServer(this.app);
    this.io = socketio(this.server, {});

    // Agregar el middleware de cors
    this.app.use(cors());
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));
  }

  execute() {
    this.middlewares();
    this.configurarSockets();
    this.server.listen(this.port, () => {
      console.log('Server corriendo', this.port);
    });
  }
}

module.exports = Server;
