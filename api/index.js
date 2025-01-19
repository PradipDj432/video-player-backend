require("dotenv").config();
const express = require("express");
const http = require("http"); // Importing http module for server creation
const socketIo = require("socket.io"); // Importing socket.io

const routesMaster = require("./routes/routesMaster");
const configMaster = require("./config/configMaster");
const cors = require("cors");

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();

// Create an HTTP server using Express app
const server = http.createServer(app);

// Initialize Socket.IO with the server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes and database connection
routesMaster(app);
configMaster.connectMongoDB();

// Socket.IO events
let users = {}; // Store connected users

// When a client connects
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Register username and associate it with the socket ID
  socket.on("register", (username) => {
    users[username] = socket.id;
    console.log(`User ${username} registered with socket ID: ${socket.id}`);
  });

  // Handle sending a message to a specific user
  socket.on("sendMessage", (data) => {
    const { recipient, message } = data;
    if (users[recipient]) {
      const recipientSocketId = users[recipient];

      // Delay of 1 second before sending the message back
      setTimeout(() => {
        // Emit the message back to the sender after 1 second
        io.to(recipientSocketId).emit("receiveMessage", message);
        console.log(`Message sent to ${recipient}: ${message}`);
      }, 1000); // 1000ms = 1 second
    } else {
      console.log("Recipient not found");
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    // Clean up user when disconnected
    for (let username in users) {
      if (users[username] === socket.id) {
        delete users[username];
      }
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
