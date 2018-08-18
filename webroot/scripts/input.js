class Input {
    constructor(dependencies) {
        this._socket = dependencies.socket;
        this.x = 0;
        this.y = 0;
        this._credentials = {
            username: dependencies.username,
            secret: dependencies.secret
        };

        this._canvas = document.getElementById("main-canvas");
        this._setUpKeyListeners();
    }

    _setUpKeyListeners() {
        const RIGHT_ARROW = 39,
            LEFT_ARROW = 37;

        /** Adding key related event listeners, if right or left arrow is pressed, it will call a function to perform an action */
        document.addEventListener("keydown", event => {
            switch (event.keyCode) {
                case RIGHT_ARROW:
                    this._sendRightArrowDownAction();
                    break;
                case LEFT_ARROW:
                    this._sendLeftArrowDownAction();
                    break;
            }
        });

        /** Adding key related event listeners, if right or left arrow is released, it will call a function to perform an action */
        document.addEventListener("keyup", event => {
            switch (event.keyCode) {
                case RIGHT_ARROW:
                    this._sendRightArrowUpAction();
                    break;
                case LEFT_ARROW:
                    this._sendLeftArrowUpAction();
                    break;
            }
        });

        /** Adding mouse related event listeners, if mouse is pressed, it will pass an object containing mouse coordinates to a function to perform an action */
        document.addEventListener("onmousedown", event => {
            console.log('mouse up')
            this._sendMouseDownAction({
                x: event.clientX,
                y: event.clientY
            });
        });

        /** Adding mouse related event listeners, if mouse is released, it will pass an object containing mouse coordinates to a function to perform an action */
        document.addEventListener("onmouseup", event => {
            this._sendMouseUpAction({
                x: event.clientX,
                y: event.clientY
            });
        });
    }

    // All the following functions will communicate with the server when a given event occurs
    /** This function will be called in case the right arrow key is pressed */
    _sendRightArrowDownAction() {
        this.x += 1;
        this.y += 1;
        // this.findAngle(this.x++, this.y++);
        this._socket.emit("rightArrowDown", { action: 'right-arrow', ...this._credentials });

        this._socket.on('move right', function (msg) {
            // console.log(msg);
        });
    }

    /** This function will be called in case the left arrow key is pressed */
    _sendLeftArrowDownAction() {
        this._socket.emit("leftArrowDown", { action: 'left-arrow', ...this._credentials });

        this._socket.on('move left', function (msg) {
            // console.log(msg);
        });
    }

    /** This function will be called in case the right arrow key is released */
    _sendRightArrowUpAction() {
        this._socket.emit("rightArrowUp", this._credentials);

        this._socket.on('right released', function (msg) {
            // console.log(msg);
        });
    }

    /** This function will be called in case the left arrow key is released */
    _sendLeftArrowUpAction() {
        this._socket.emit("leftArrowUp", this._credentials);

        this._socket.on('left released', function (msg) {
            // console.log(msg);
        });
    }

    /** This function will be called in case the mouse is pressed */
    _sendMouseDownAction(point) {
        this._socket.emit("leftMouseDown", this._credentials, point);
    }

    /** This function will be called in case the mouse is released */
    _sendMouseUpAction(point) {
        this._socket.emit("leftMouseUp", this._credentials, point);
    }

    /** This function will be used to find the cannon pointing angle */
    findAngle(pointA, pointB) {
        console.log('point b', pointB)
        let angRad = Math.atan(Math.abs(pointB.y - pointA.y) / Math.abs(pointB.x - pointA.x));
        return angRad * (180 / Math.PI);
    }
}