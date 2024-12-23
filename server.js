const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (frontend)
app.use(express.static("public"));

// WebRTC signaling
io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);

    socket.on("signal", (data) => {
        const { to, from, signal } = data;
        io.to(to).emit("signal", { from, signal });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
