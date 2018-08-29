class UserInputEventListener{
    constructor(dependencies){
        this._io = dependencies.io;
        this._userInputService = dependencies.userInputService;
        this._initiateListeners();
    }

    _initiateListeners(){
        this._io.on("connect", socket => {
            // Right arrow
            socket.on('rightArrowDown', credentials  => {
                this._userInputService.addKeyEvent(credentials, {name: "rightArrowDown"});
            });
            socket.on('rightArrowUp', credentials => {
                this._userInputService.addKeyEvent(credentials, {name: "rightArrowUp"});
            });

            // Left arrow
            socket.on('leftArrowDown', credentials => {
                this._userInputService.addKeyEvent(credentials, {name: "leftArrowDown"});
            });
            socket.on('leftArrowUp', credentials => {
                this._userInputService.addKeyEvent(credentials, {name: "leftArrowUp"});
            });

            // Mouse
            socket.on('leftMouseDown', msg => {
                this._userInputService.addMouseEvent(msg.credentials, {name: "leftMouseDown"});
            });
            socket.on('leftMouseUp', msg => {
                this._userInputService.addMouseEvent(msg.credentials, {name: "leftMouseUp"});
            });
        });
    }
}

module.exports = UserInputEventListener;