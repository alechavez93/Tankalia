class Graphics{

    /** Initializing object via constructor, getting canvas and 2D context, then loading images */
    constructor(dependencies){
        this.socket = dependencies.socket;
        let canvas = document.getElementById("main-canvas");
        this.ctx = canvas.getContext("2d");
        this.loadImages();
    }

    /** Function loads all images asynchronously */
    loadImages(){
        /** Creating the image factory, which is where I will store all loaded images */
        this.imageLibrary = {};
        /** Base path in the client directory, assuming this loads from index */
        let basePath = "images/";

        /** Query server for the list of images using the socket */
        this.socket.emit("getImageFiles");

        /** Once the socket returns with all the image file names we just load them to the library */
        this.socket.on("imageFiles", files => {
            files.forEach(file => {
                let imagePath = basePath + file;
                /** We only want to load png and gif extensions, also making sure the image exists in the server */
                if((file.includes(".png") || file.includes(".gif")) && this.imageExists(imagePath)){

                    /** The image key name represents the id for that image in the library, we will use image name minus extension */
                    let imageNameKey = file.replace(".png", "").replace(".gif", "");
                    let image = new Image();
                    image.src = imagePath;

                    /** Assign images to library and track if they have loaded */
                    this.imageLibrary[imageNameKey] = {
                        image: image,
                        loaded: false
                    };
                    image.onload = () => {
                        this.imageLibrary[imageNameKey].loaded = true;
                    }
                }
            })
        })
    }

    /** This function checks if an image is present in the server by trying to open it through HTTP */
    imageExists(imageUrl){
        let http = new XMLHttpRequest();
        http.open('HEAD', imageUrl, false);
        http.send();
        return http.status !== 404;
    }

    /** Safely draws a loaded image using image name and coordinates */
    drawImage(imageName, x, y){
        if(this.imageLibrary[imageName].loaded){
            this.ctx.drawImage(this.imageLibrary[imageName], x, y);
        }
    }
}