const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const Sockets = require('./sokets');
require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.server = http.createServer(this.app);
    this.io = socketio(this.server, {});
  }

  configureSockets() {
    new Sockets(this.io);
  }

  middlewares() {
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
