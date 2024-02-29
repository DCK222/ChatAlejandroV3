import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Chat en tiempo real!\n");
});


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


io.on("connection", (socket) => {
  console.log("Usuario conectado!");


  socket.on("Mensaje de chat", (msg) => {
  
    io.emit("Mensaje de chat", msg);
    console.log("Mensaje de chat: " + msg);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado!");
  });
});


server.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:5500");
});

export default { server, io };