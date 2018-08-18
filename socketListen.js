module.exports = {
    socketListen: function(io) {
        io.on("connect", function (socket) {
            io.connectedSockets.push(socket);
            console.log("Socket connected!");

            socket.on('rightArrowDown', function (msg) {
                console.log("The right was pressed")
                io.emit('move right', 'Move 1px right');
            });

            socket.on('leftArrowDown', function (msg) {
                console.log("The left was pressed")
                io.emit('move left', 'Move 1px left');
            });

            socket.on('rightArrowUp', function (msg) {
                console.log("Right arrow was released")
                io.emit('right released', 'Right arrow released');
            });

            socket.on('leftArrowUp', function (msg) {
                console.log("Left arrow was released")
                io.emit('left released', 'Left arrow released');
            });
        });
    }
}