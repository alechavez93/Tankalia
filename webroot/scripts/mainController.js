let socket = io.connect();

let graphics = new Graphics({
    socket: socket
});

let input = new Input({
    socket: socket,
    username: "TestUser",
    secret: "TestSecret"
});

// This code is for testing purposes
setTimeout(() => {
    graphics.drawGreenTank(positionX, positionY, cannonAngle);
}, 500);

