const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors'); // Importar el paquete de cors

const Sockets = require('./sockets');

class Server {
  constructor() {
    this.app = express();
    this.port = 8000;
    this.server = http.createServer(this.app);
    this.io = socketio(this.server, {});
  }

  configureSockets() {
    new Sockets(this.io);
  }

  middlewares() {
    // Habilitar cors
    this.app.use(cors());

    this.app.use(express.static(path.resolve(__dirname, '../public')));
  }

  execute() {
    this.middlewares();
    this.configureSockets();
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
