let fs = require("fs");

class FileService{
    /** Initializes service with required dependencies */
    constructor(dependencies){
        this.io = dependencies.io;
        this.initializeServices();
    }

    /** Assigns all listeners related to file operations to every _socket on connection */
    initializeServices(){
        this.io.sockets.on("connection", socket => {
            this.getAllImageFiles(files => {
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
//synchronous vs asynchronous -> check out
//clean architecture by uncle bob
//https://www.youtube.com/watch?v=Bv_5Zv5c-Ts
//dynamic typed vs strongly typed languages
//Medium Topics: Mobile Development, Android, IOS, Client-Server(The internet), Game Development
//Advanced Topics: AI, Machine Learning, Neural Networks, Blockchain, Cryptography, IoT