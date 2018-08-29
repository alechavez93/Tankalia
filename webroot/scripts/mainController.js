let socket = io.connect();

let graphics = new Graphics({
    socket: socket
});

let input = new Input({
    socket: socket,
    username: "TestUser",
    secret: "TestSecret"
});

// let positionX = 20;
// let positionY = 100;
// let cannonAngle = Input.findAngle({x : positionX, y: positionY}, {x: 0, y:0});
//
// // This code is for testing purposes
// setTimeout(() => {
//     graphics.drawGreenTank(positionX, positionY, cannonAngle);
// }, 500);

