class Input {

    constructor(dependencies) {
        this._socket = dependencies.socket;
        this.canvas = document.getElementById("main-canvas");
    }

    /** This function will check if the right arrow is being pressed, and will return a boolean indicating the action*/
    rightArrow(){
       document.addEventListener('keydown', function(event){

           if(event.keyCode === 39){
               console.log("The right arrow was pressed");
             return true;
           }
       });
        return false
    }

    /** This function will check if the left arrow is being pressed, and will return a boolean indicating the action*/
    leftArrow(){
        document.addEventListener('keydown', function(event){

            if(event.keyCode === 37){
                console.log("The left arrow was pressed");
                return true;
            }
        });
        return false
    }

    /** This function will check if the mouse is pressed, and will return a boolean indicating the action*/
    isMouseDown(){
        this.canvas.onmousedown = function(){
            console.log("The mouse is pressed");
            return true
        };
        return false
    }

    /** This function will check if the mouse is clicked, and will find its x and y coordinates*/
    mousePosition(){
        let x = 0;
        let y = 0;
        this.canvas.onclick = function(event){
            x = event.clientX;
            y = event.clientY;
            console.log("The mouse X position is " + x + " and its Y position is " + y);
        };
        return {"x": x, "y": y}
    }

    findAngle(posArr){
        let xMouse = posArr.x;
        let yMouse = posArr.y;

        /** This is temporary, it must be replaced by the cannon image rotating axis */
        let canonAxisX = 70;
        let canonAxisY = 90;
        //
        // //let greenCanon = graphics.imageLibrary["cannonGreen"];
        //
        // let canonAxisX = greenCanon.width/20;
        // let canonAxisY = greenCanon.height/5;
        //
        let angRad = Math.atan(Math.abs(canonAxisY - yMouse)/Math.abs(canonAxisX - xMouse));
        let angDeg = angRad * (180/Math.PI);

        /** This is just to check if the current mouse location is been properly received*/
        if(xMouse !== 0) {
            console.log("The x position is " + xMouse);
        }
        else{
            console.log("The mouse has not been clicked");
        }
        console.log("The cannon angle is " + angDeg);
        return angDeg;

        // so far the problem is that the function mousePosition() is not returning the x and y values every time the mouse is click is released, so, information is not getting updated
    }

}