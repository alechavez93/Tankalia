let xPositionChange = 0;

module.exports = {
    socketListen: function(io) {
        io.on("connect", function (socket) {
            io.connectedSockets.push(socket);
            console.log("Socket connected!");

            socket.on('rightArrowDown', function (msg) {
                xPositionChange++;
                console.log("The right was pressed");
                io.emit('move right', xPosition);
            });

            socket.on('leftArrowDown', function (msg) {
                xPositionChange--;
                console.log("The left was pressed");
                io.emit('move left', xPosition);
            });

            socket.on('rightArrowUp', function (msg) {
                console.log("Right arrow was released");
                io.emit('right released', 'Right arrow released');
            });

            socket.on('leftArrowUp', function (msg) {
                console.log("Left arrow was released");
                io.emit('left released', 'Left arrow released');
            });

            socket.on('leftMouseDown', function (msg) {
                console.log("The mouse was pressed");
                io.emit('mousePressed', 'The mouse was pressed');
            });

            socket.on('leftMouseUp', function (msg) {
                console.log("The mouse was released");
                io.emit('mouseReleased', 'The mouse was released');
            });
        });
    }
}