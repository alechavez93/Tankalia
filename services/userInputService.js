let hash = require('node_hash');

class UserInputService{
    constructor(dependencies){
        this._dependecies = dependencies;
        this._userInputMap = {};
        // For test
        this.addUser({username: "TestUser", secret: "TestSecret"});
    }

    addUser(credentials){
        let userHash = this._getUserHash(credentials);
        this._userInputMap[userHash] = {
            keypad: {
                up: false,
                down: false,
                left: false,
                right: false
            },
            mouse: {
                xCor: 0,
                yCor: 0,
                leftClick: false,
                rightClick: false
            }
        }
    }

    addMouseEvent(credentials, event){
        let userHash = this._getUserHash(credentials);
        let userInputState = this._userInputMap[userHash];
        if(!userInputState) return;
        switch(event.name){
            case "leftMouseDown":
                userInputState.mouse.leftClick = true;
                break;
            case "leftMouseUp":
                userInputState.mouse.leftClick = false;
                break;
            case "updateMouse":
                userInputState.mouse.xCor = event.x;
                userInputState.mouse.yCor = event.y;
        }

        console.log(this._userInputMap);
    }

    addKeyEvent(credentials, event){
        let userHash = this._getUserHash(credentials);
        let userInputState = this._userInputMap[userHash];
        if(!userInputState) return;
        switch(event.name){
            case "rightArrowDown":
                userInputState.keypad.right = true;
                break;
            case "rightArrowUp":
                userInputState.keypad.right = false;
                break;
            case "leftArrowDown":
                userInputState.keypad.left = true;
                break;
            case "leftArrowUp":
                userInputState.keypad.left = false;
                break;
        }

        console.log(this._userInputMap);
    }

    _getUserHash(credentials){
        return hash.sha1(credentials.username + credentials.secret);
    }
}

module.exports = UserInputService;