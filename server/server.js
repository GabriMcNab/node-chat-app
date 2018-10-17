const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected!');

  socket.on('createMessage', (newMessage) => {
    console.log('create message', newMessage);

    io.emit('newMessage', {
      ...newMessage,
      createdAt: new Date().getTime()
    });
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected!');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});