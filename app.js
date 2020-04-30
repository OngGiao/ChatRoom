const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(9391);
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    // socket.emit('news', { hello: 'world' });
    socket.on('joinRoom', (data) => {
        socket.username = data;
        console.log(data);
    });

    socket.on('message', (data) => {
        console.log(data);
        io.emit('message', {
            username: socket.username,
            message: data
        });
    });


});