let socket = io.connect();

let graphics = new Graphics({
    socket: socket
});

let input = new Input({
    socket: socket,
    username: "TestUser",
    secret: "TestSecret"
});

let positionX = 20;
let positionY = 100;
let cannonAngle = () => {
    return input.findAngle({ x: positionX, y: positionY }, { x: input.x, y: input.y })
};

// This code is for testing purposes
setInterval(() => {

    console.log('cannonAngle ', cannonAngle());
    graphics.drawGreenTank(positionX, positionY, cannonAngle());
}, 500);