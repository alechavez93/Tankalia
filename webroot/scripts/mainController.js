let socket = io.connect();
let graphics = new Graphics({ socket: socket });

// This code is for testing purposes
setTimeout(() => {
    graphics.drawGreenTank(20, 50, 30);
}, 500);
