const socket = require('./socketListen');

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

app.get('/', function (req, res) {
    console.log('TEST')
    res.send('Hello moot');
});

io.connectedSockets = [];
socket.socketListen(io);

/** Initializing services */
let fileService = new (require("./services/fileService"))({ io: io });