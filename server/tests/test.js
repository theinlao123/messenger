const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const supertest = require('supertest');
const chai = require('chai');
const ioClient = require('socket.io-client');

const app = express();
const server = http.createServer(app);
const socketServer = socketIO(server);

const PORT = 5000; 
const socketURL = `http://localhost:${PORT}`;

const expect = chai.expect;
const request = supertest(socketURL);


describe('Server Tests', () => {
  before((done) => {
    server.listen(PORT, () => {
      console.log('Test server running on port ' + PORT);
      done();
    });
  });

  after(() => {
    server.close();
  });

  it('should handle socket connections', (done) => {
    const client = ioClient.connect(socketURL);

    client.on('connect', () => {
      client.disconnect();
      done();
    });
  });
  
});
