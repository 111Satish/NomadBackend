require('dotenv').config();
const express = require('express');
const MdbConnect = require('./config');
const signUpRouter = require('./routers/signup');
const loginRouter = require('./routers/login');
const roomsRouter = require('./routers/getRoom');
const joinedRoomRouter = require('./routers/joinedRooms');
const leaveRoomRouter = require('./routers/leaveRoom');
const updateUsers = require('./routers/updateUsers');
const getChatRouter = require('./routers/getChats')
const feedbackRouter = require('./routers/feedback');
const reviewRouter = require('./routers/review');
const roomDetailsRouter = require('./routers/roomDetails');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();
const { createServer } = require('http');
const server = createServer(app);
const io = new Server(server);
const Room = require('./DataModels/rooms');
const PORT = process.env.PORT || 5000;
MdbConnect()

app.use(cors({
  origin: 'http:0.0.0.0',
  credentials: true, 
}));
app.use(express.json());

app.use('/SignUp', signUpRouter);
app.use('/Login', loginRouter);
app.use('/getRoom', roomsRouter);
app.use('/rooms', joinedRoomRouter);
app.use('/rooms', leaveRoomRouter);
app.use('/getChats', getChatRouter);
app.use('/feedback', feedbackRouter);
app.use(updateUsers);
app.use('/review', reviewRouter);
app.use('/roomDetails', roomDetailsRouter);

app.get('/', (req, res) => {
  res.send('Server is running');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('chat message', async (roomId, msg) => {
    console.log(`Received chat message in room ${roomId}:`, msg);
    // const existingRoom = await Room.findById(roomId);

    // if (existingRoom) {
    //   existingRoom.chat.push(msg);
    //   await existingRoom.save();
    //   io.to(roomId).emit('chat message', msg);
    // } else {
    //   console.error('Room not found');
    // }

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      {
        $push: {
          chat: msg
        }
      },
      { new: true }
    );
    io.to(roomId).emit('chat message', msg);
    if (!updatedRoom) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});

module.exports = app;
