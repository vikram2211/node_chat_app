import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();


const app = express();
app.use(cors());
const server = http.createServer(app);


const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use(express.static(path.join(__dirname, "../client"))); 


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})



const io = new Server(server, { cors: { origin: "*" } });


io.on("connection", (socket) => {
    console.log('Connected...')
    // chatSocket(socket, io);

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
  });

