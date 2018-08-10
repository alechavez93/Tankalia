let port = process.env.PORT || 8000,
    express = require("express"),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server),
    fs = require("fs");

app.use(express.static("webroot"));

server.listen(port, () => {
    console.log(`For Debugging => Listening on: http://localhost:${port}`);
});

io.connectedSockets = [];
io.on("connect", function (socket) {
    io.connectedSockets.push(socket);
    console.log("Socket connected!");
});

/** Initializing services */
let fileService = new (require("./services/fileService"))({ io: io });

