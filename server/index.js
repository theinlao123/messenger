// Подключаем библиотеку Express
const express = require('express');
// Создаем объект приложения Express
const app = express();
// Устанавливаем порт, на котором будет работать сервер
const PORT = 5000;
// Подключаем библиотеку http и создаем сервер, используя объект приложения Express
const http = require('http').Server(app);
// Подключаем библиотеку cors для обработки кросс-доменных запросов
const cors = require('cors');
// Подключаем библиотеку socket.io и передаем ей созданный сервер http
const socketIO = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:5173'
    }
})

app.get('api', (req, res) => {
    res.json({
        message: 'hello'
    })
});

const users = []

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user connected`)

    socket.on('message', (data) => {
        socketIO.emit('response', data)
    })

    socket.on('newUser', (data) => {
        users.push(data);
        socketIO.emit('responseNewUser', users)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnect`)
    })
})

http.listen(PORT, () => {
    console.log('Server working')
})