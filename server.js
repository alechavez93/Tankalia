let port = process.env.PORT || 8000,
    express = require("express"),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server),
    fs = require("fs");

app.use(express.static("webroot"));

server.listen(port, function(){
    console.log(`For Debugging => Listening on: http://localhost:${port}`);
});

io.on("connect", function (socket) {
    console.log("Socket connected!");
});

