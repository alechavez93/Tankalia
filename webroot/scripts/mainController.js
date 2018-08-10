let socket = io.connect();
let graphics = new Graphics({ socket: socket });

// This code is for testing purposes
setTimeout(() => {
    graphics._drawTank(graphics.imageLibrary["tankGreen"].image, graphics.imageLibrary["cannonGreen"].image, 20, 50, 0);
}, 500);
