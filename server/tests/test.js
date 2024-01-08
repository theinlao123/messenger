const supertest = require('supertest');
const chai = require('chai');
const ioClient = require('socket.io-client');

const app = require('../index'); 
const socketURL = 'http://localhost:5000';

const expect = chai.expect;
const request = supertest(app);

describe('User API', () => {
  let socket;

  beforeEach((done) => {
      // Подключаемся к серверу перед каждым тестом
      socket = ioClient.connect(socketURL);

      // Ждем подключения
      socket.on('connect', () => {
          done();
      });
  });

  afterEach(() => {
      // Отключаемся от сервера после каждого теста
      if (socket.connected) {
          socket.disconnect();
      }
  });

  it('Add new user', (done) => {
      const newUser = {
          socketID: 'someSocketID',
      };

      request
          .post('/newUser')
          .send(newUser)
          .expect(200)
          .end((err, res) => {
              if (err) return done(err);

              //ответ - это массив пользователей
              expect(res.body).to.be.an('array');
              done();
          });
  });

  it('User disconnect', (done) => {
  
      socket.disconnect();
      done();
  });

  it('should handle message and emit response', (done) => {
    const messageData = {
        // сообщение
        text: 'Hello, Server!'
    };

    socket.on('response', (response) => {
        expect(response).to.deep.equal(messageData);
        done();
    });

    socket.emit('message', messageData);
  });
});







// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const supertest = require('supertest');
// const chai = require('chai');
// const ioClient = require('socket.io-client');

// const app = express();
// const server = http.createServer(app);
// const socketServer = socketIO(server);

// const PORT = 5000; 
// const socketURL = `http://localhost:${PORT}`;

// const expect = chai.expect;
// const request = supertest(socketURL);

// describe('Server Tests', () => {
//   let server;

//   beforeEach((done) => {
//     server = app.listen(5000, done);
//   });

//   afterEach((done) => {
//     server.close(done);
//   });

//   it('should add a new user', (done) => {
//     const client = ioClient.connect(socketURL);

//     client.on('connect', () => {
//       const newUser = { socketID: client.id, username: 'testUser' };

//       client.emit('newUser', newUser);

//       client.on('responseNewUser', (users) => {
//         expect(users).to.deep.include(newUser);
//         client.disconnect();
//         done();
//       });
//     });
//   });

//   it('should disable message sending', (done) => {
//     const client = ioClient.connect(socketURL);

//     client.on('connect', () => {
//       const messageData = { text: 'Test message' };

//       client.emit('message', messageData);

//       client.on('response', (data) => {
//         // Ensure that the server did not broadcast the message
//         expect(data).to.not.exist;
//         client.disconnect();
//         done();
//       });
//     });
//   });
// });

// describe('Server Tests', () => {
//   before((done) => {
//     server.listen(PORT, () => {
//       console.log('Test server running on port ' + PORT);
//       done();
//     });
//   });

//   after(() => {
//     server.close();
//   });

//   it('should handle socket connections', (done) => {
//     const client = ioClient.connect(socketURL);

//     client.on('connect', () => {
//       client.disconnect();
//       done();
//     });
//   });
  
// });
