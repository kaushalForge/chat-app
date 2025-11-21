// server.js
import { createServer } from "http";
import { Server } from "socket.io";
import dbConnect from "./lib/dbConnection.js";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  try {
    const server = createServer();

    // 3. Setup Socket.IO with CORS
    const io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST"],
      },
    });

    // 4. Handle Socket.IO connections
    io.on("connection", (socket) => {
      console.log("Socket connected ✅", socket.id);

      socket.on("message", (msg) => {
        console.log("Message received:", msg);
        io.emit("server-message", msg);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected ❌", socket.id);
      });
    });

    // 5. Start server
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
      console.log(`Server running on port ${port} 🚀`);
    });
  } catch (err) {
    console.error("Server failed to start ❌", err);
  }
};

startServer();
