let socket = io.connect();

let positionX = 20;
let positionY = 100;
let cannonPositionX = 70;
let cannonPositionY = 275;

let graphics = new Graphics({
    socket: socket
});

let input = new Input({
    socket: socket,
    username: "TestUser",
    secret: "TestSecret"
});


setInterval(() => {

    positionX = positionX + input.getXpositionChange();
    cannonPositionX = positionX + 50;
    cannonPositionY = positionY + 175;

    if(positionX <= 20){
        positionX = 20;
        cannonPositionX = positionX + 50;
    }
    else if(positionX >= 470){
        positionX = 470;
        cannonPositionX = positionX + 50;
    }
    //console.log("The cannon x position is: " + cannonPositionX + " and the tank position is: " + positionX);
    let cannonAngle = () => {
        return input.findAngle({ x: cannonPositionX, y: cannonPositionY }, { x: input.getXPosition(), y: input.getYPosition() })
    };

    graphics._ctx.clearRect(0,0,innerWidth,innerHeight);
    //graphics.drawBackgroundImage();
    graphics.drawGreenTank(positionX, positionY, cannonAngle());
}, 200);