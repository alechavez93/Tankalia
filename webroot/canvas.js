let canvas = document.querySelector('canvas');

canvas.width = 1000;
canvas.height = 600;

let context = canvas.getContext('2d');

// background image
background();
function background(){
    backgroundImage = new Image();
    backgroundImage.src = "https://superdevresources.com/wp-content/uploads/2016/01/free-mountain-landscape-wallpaper.png";
    backgroundImage.onload = function (){
     context.drawImage(backgroundImage,0,0);
    }
}


//tank 1
let tank1x = 300;
let tank1y = 525;

tank1();
function tank1(tank1x, tank1y) {
    tank1Image = new Image();
    tank1Image.src = 'images/tankBlue.png';
    tank1Image.height = 20;
    tank1Image.width = 20;
    tank1Image.onload = function () {
        context.drawImage(tank1Image
        , tank1x, tank1y, 40, 30);
}
}

//tank 2
let tank2x = 700;
let tank2y = 525;

tank2();
function tank2(tank2x, tank2y) {
    tank2Image = new Image();
    tank2Image.src = 'images/tankGreen.png';
    tank2Image.onload = function () {
        context.drawImage(tank2Image, tank2x, tank2y, 40, 30);
    }

}

function animation(){
    requestAnimationFrame(animation)

    tank1(tank1x, tank1y);
    tank2(tank2x, tank2y);

    tank1x += 1;
    tank2x -= 1;

    if(tank1x == tank2x){
        context.font = "30px Arial";
        context.fillText("Game Over! Tanks Collided", 490, 300, 200)
    }
}

animation();