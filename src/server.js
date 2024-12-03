import express from "express";
import http from 'http';
import { Server } from 'socket.io';

import cors from "cors";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import chatRoutes from './routes/chat.js';
import chatSocket from './sockets/chat.js';


dotenv.config();

connectDB();

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static('client'));

app.use('/api/chat', chatRoutes);

io.on('connection', (socket) => {
    console.log('New client connected');
    chatSocket(socket, io);
  });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
