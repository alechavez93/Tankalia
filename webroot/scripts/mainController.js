let socket = io.connect();
let graphics = new Graphics({ socket: socket });
let input = new Input({ socket: socket});
let cannonAngle = 30;
let positionX = 20;
let positionY = 100;

let mouseDown = input.isMouseDown();
let rigthArrow = input.rightArrow();
let leftArrow = input.leftArrow();
cannonAngle = input.findAngle(input.mousePosition());

// This code is for testing purposes
setTimeout(() => {
    graphics.drawGreenTank(positionX, positionY, cannonAngle);
}, 500);

