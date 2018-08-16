class Input {

    constructor(dependencies) {
        this._socket = dependencies.socket;
        this._credentials = {
            username: dependencies.username,
            secret: dependencies.secret
        };
        this._canvas = document.getElementById("main-canvas");
        this._setUpKeyListeners();
    }

    _setUpKeyListeners(){
        const RIGHT_ARROW = 39,
              LEFT_ARROW = 37;

        /** Adding key related event listeners */
        this._canvas.addEventListener("keydown", event => {
            switch(event.keyCode){
                case RIGHT_ARROW:
                    this._sendRightArrowDownAction();
                    break;
                case LEFT_ARROW:
                    this._sendLeftArrowDownAction();
                    break;
            }
        });

        this._canvas.addEventListener("keyup", event => {
            switch(event.keyCode){
                case RIGHT_ARROW:
                    this._sendRightArrowUpAction();
                    break;
                case LEFT_ARROW:
                    this._sendLeftArrowUpAction();
                    break;
            }
        });

        /** Adding mouse related event listeners */
        this._canvas.addEventListener("onmousedown", event => {
           this._sendMouseDownAction({
               x: event.clientX,
               y: event.clientY
           });
        });

        /** Adding mouse related event listeners */
        this._canvas.addEventListener("onmouseup", event => {
            this._sendMouseUpAction({
                x: event.clientX,
                y: event.clientY
            });
        });
    }

    _sendRightArrowDownAction(){
        this._socket.emit("rightArrowDown", this._credentials);
    }

    _sendLeftArrowDownAction(){
        this._socket.emit("leftArrowDown", this._credentials);
    }

    _sendRightArrowUpAction(){
        this._socket.emit("rightArrowUp", this._credentials);
    }

    _sendLeftArrowUpAction(){
        this._socket.emit("leftArrowUp", this._credentials);
    }

    _sendMouseDownAction(point){
        this._socket.emit("leftMouseDown", this._credentials, point);
    }

    _sendMouseUpAction(point){
        this._socket.emit("leftMouseUp", this._credentials, point);
    }


    static findAngle(pointA, pointB){
        let angRad = Math.atan(Math.abs(pointB.y - pointA.y)/Math.abs(pointB.x - pointA.x));
        return angRad * (180/Math.PI);
    }
}