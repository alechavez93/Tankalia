class Graphics{

    /** Initializing object via constructor, getting canvas and 2D context, then loading images */
    constructor(dependencies){
        this._socket = dependencies.socket;
        let canvas = document.getElementById("main-canvas");
        this._ctx = canvas.getContext("2d");
        this._imageShrinkRatio = 10;
        this._loadImages();
    }

    /** Function loads all images asynchronously */
    _loadImages(){
        /** Creating the image factory, which is where I will store all loaded images */
        this.imageLibrary = {};
        /** Base path in the client directory, assuming this loads from index */
        let basePath = "images/";

        /** Query server for the list of images using the _socket */
        this._socket.emit("getImageFiles");

        /** Once the _socket returns with all the image file names we just load them to the library */
        this._socket.on("imageFiles", files => {
            files.forEach(file => {
                let imagePath = basePath + file;
                /** We only want to load png and gif extensions, also making sure the image exists in the server */
                if((file.includes(".png") || file.includes(".gif")) && this._imageExists(imagePath)){

                    /** The image key name represents the id for that image in the library, we will use image name minus extension */
                    let imageNameKey = file.replace(".png", "").replace(".gif", "");
                    let image = this._getImageObject(file);
                    image.src = imagePath;

                    /** Assign images to library and track if they have loaded */
                    this.imageLibrary[imageNameKey] = {
                        image: image,
                        loaded: false
                    };
                    image.onload = () => {
                        this.imageLibrary[imageNameKey].loaded = true;
                    };
                }
            })
        })
    }

    /** Returns image specific dimensions for a certain entity */
    _getImageObject(entityName){
        let width, height;
        if(entityName.includes("tank")) {
            width = 477 / this._imageShrinkRatio;
            height = 288 / this._imageShrinkRatio;
        }
        else if(entityName.includes("cannon")){
            width = 232 / this._imageShrinkRatio;
            height = 68 / this._imageShrinkRatio;
        }

        return new Image(width, height);
    }

    /** This function checks if an image is present in the server by trying to open it through HTTP */
    _imageExists(imageUrl){
        let http = new XMLHttpRequest();
        http.open('HEAD', imageUrl, false);
        http.send();
        return http.status !== 404;
    }

    /** Safely draws a loaded image using image name and coordinates */
    _drawImage(image, positionX, positionY){
        this._ctx.drawImage(image, positionX, positionY, image.width, image.height);
    }

    /** Safely rotates and draws an image using an axis and rotation angle */
    _rotateAndDrawImage(image, angleInRad , positionX, positionY, axisX, axisY ) {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, positionX, positionY);
        this._ctx.rotate(angleInRad);
        this._drawImage(image, -axisX, -axisY);
        this._ctx.restore();
    }

    /** Draws image of a tank using certain images and coordinates */
    _drawTank(tankImage, canonImage, positionX, positionY, canonAngle){
        let canonX = positionX + tankImage.width/2;
        let canonY = positionY - tankImage.height/16;
        let canonAxisX = canonImage.width/20;
        let canonAxisY = canonImage.height/5;
        this._drawImage(tankImage, positionX, positionY);
        this._rotateAndDrawImage(canonImage, (canonAngle*Math.PI/180), canonX, canonY, canonAxisX, canonAxisY);
    }
}