let fs = require("fs");

class FileService{
    /** Initializes service with required dependencies */
    constructor(dependencies){
        this.io = dependencies.io;
        this.initializeServices();
    }

    /** Assigns all listeners related to file operations to every socket on connection */
    initializeServices(){
        this.io.sockets.on("connection", socket => {
            this.getAllImageFiles((files) => {
                socket.on("getImageFiles", () => {
                    socket.emit("imageFiles", files);
                });
            });
        });
    }

    /** Gets all image file names using file system
     * Note this cannot be done from the client since JavaScript gives no access to server or clint file system */
    getAllImageFiles(callback){
        fs.readdir("./webroot/images/", (err, files) => {
            callback(files);
        });
    }
}

module.exports = FileService;