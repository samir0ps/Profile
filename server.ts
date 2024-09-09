import { createServer } from "node:http";
import next from "next";
import { Server, Socket } from "socket.io";

const dev: boolean = process.env.NODE_ENV !== "production";
const hostname: string = "localhost";
const port: number = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
  
  type Message  ={
    content : string,
    from : string,
    to : string ,
    created_at : string
  }

  const userSocketMap = new Map<string, string>();

  io.on("connection", (socket: Socket) => {
    socket.on('register', (email: string) => {
      userSocketMap.set(email, socket.id);
    });

    socket.on('message', (msg: Message) => {
      const recipientSocketId = userSocketMap.get(msg.to);
      const adminSocketId = userSocketMap.get('mahmoud7samirr@gmail.com')
      if (recipientSocketId) {
        socket.to(recipientSocketId).emit('newMessages', msg);
        if(adminSocketId){
          socket.to(adminSocketId).emit('new_notification' , {title:'New Message' , created_at:new Date() , sender : msg.from})
        }
      } else {
        console.log(`User with email ${msg.to} is not connected`);
      }
    });

    socket.on('disconnect', () => {
      Array.from(userSocketMap.entries()).forEach(([email, id]) => {
        if (id === socket.id) {
          userSocketMap.delete(email);
        }
      });
    });
  });

  httpServer
    .once("error", (err: Error) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});