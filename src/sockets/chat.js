import Message from '../models/Messages.js';
 
const chatSocket =  (socket, io) => {
  socket.on('sendMessage', async (data) => {
    const newMessage = new Message({ username: data.username, text: data.text });
    await newMessage.save();
    io.emit('receiveMessage', newMessage);
  });
};

export default chatSocket; 

