"use strict";

var ImageReader = require("./ImageReader");
var ImageViewer = require("./ImageViewer");
var UrlReader = require("./UrlReader");

function ImageUpload(container, className) {

    var that = this;
    var errorMessage;
    var flag = false;
    this.onImageUpload = function() {};
    this.onSizesRecieved = function() {};
    this.onErrorMessageReceived = function() {};

    this.className = className;
    this.uploadDiv = container; 

    var buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    var imageContainer = document.createElement("div");
    imageContainer.className = "image-container";

    this.initUploadButtons = function() {

        var imageBtn = document.createElement("button");
        var urlBtn = document.createElement("button");
        imageBtn.className = "image-btn";
        imageBtn.innerHTML = "Image";
        urlBtn.className = "url-btn";
        urlBtn.innerHTML = "URL";

        buttonContainer.appendChild(imageBtn);
        buttonContainer.appendChild(urlBtn);

        imageBtn.addEventListener("click", function() {
           that.clean();
           that.initIMG();
        });
            
        urlBtn.addEventListener("click", function() {
            that.clean();
            that.initURL();
        });

    };

    this.uploadDiv.appendChild(buttonContainer);
    this.uploadDiv.appendChild(imageContainer);

    //For ImageView
	this.initIMG = function() {

        var inputImageViewer;
        var divViewer;
        var divReader =  document.createElement("div");
        divReader.className =  className;

        var reader = new ImageReader(divReader);
        reader.init();

        imageContainer.appendChild(divReader);
         var imageDataThis ;
        reader.onImageReceived = function(imageData) {           

            if(flag) {
                divViewer = document.createElement("div");
                divViewer.className = "viewer";
                imageDataThis = imageData; 
            }
  
        };
        reader.onSizeRecieved = function(size) {
            if(flag) {
                var sizes = size;
                inputImageViewer = new ImageViewer(divViewer, sizes);
                inputImageViewer.init();

                imageDataThis = inputImageViewer.setImage(imageDataThis);
                 
                imageContainer.removeChild(divReader);                   
                imageContainer.appendChild(divViewer);

                newUploadButton(divViewer,divReader);
                that.onErrorMessageReceived(errorMessage);
                that.onImageUpload(imageDataThis);
                that.onSizesRecieved(sizes);    
            }            
        };

        reader.onErrorMessageReceived = function(message) {
            errorMessage = message;

            if(errorMessage === "OK") {
                flag = true;   
            }

            that.onErrorMessageReceived(errorMessage);

        };
	};

    //For URL view
    this.initURL = function() {
        
        var divURL = document.createElement("div");
        divURL.className = "url-reader";
        var divUrlViewer;
        var inputImageUrlViewer;
        var urlImageDataThis;
        var urlReader = new UrlReader(divURL);
        urlReader.init();

        imageContainer.appendChild(divURL);

        urlReader.onImageReceived = function(imageData) {

            if(flag) {
                urlImageDataThis = imageData;
                divUrlViewer = document.createElement("div");
                divUrlViewer.className = "viewer";
            }

        };    

        urlReader.onSizeRecieved = function(size) {
            if(flag) {
                var sizes = size;
                inputImageUrlViewer = new ImageViewer(divUrlViewer,sizes);
                inputImageUrlViewer.init();

                urlImageDataThis = inputImageUrlViewer.setImage(urlImageDataThis);

                imageContainer.removeChild(divURL);
                imageContainer.appendChild(divUrlViewer);


                newUploadButton(divUrlViewer,divURL);

                that.onImageUpload(urlImageDataThis);
                that.onSizesRecieved(sizes);
            }
        };  

        urlReader.onErrorMessageReceived = function(message) {
            errorMessage = message;

            if(errorMessage === "OK") {
                flag = true;    
                console.log(errorMessage); 
            }

            that.onErrorMessageReceived(errorMessage);

        }; 
    }; 

    //to clear the image-container of children
    this.clean = function() {
        while(imageContainer.firstChild) {
            imageContainer.removeChild(imageContainer.firstChild);
        }
    };

    function newUploadButton(divViewer, divReader) {
        var newUploadBtn;

        divViewer.addEventListener("mouseenter", function() {            
            newUploadBtn = document.createElement("button");
            newUploadBtn.className = "uploadBtn fill";
            newUploadBtn.innerHTML = "New Upload";
            divViewer.appendChild(newUploadBtn);

            newUploadBtn.addEventListener("click", function() {
                imageContainer.removeChild(divViewer);
                that.clean();                      
                imageContainer.appendChild(divReader);
            });

        });

        divViewer.addEventListener("mouseleave", function() {

            divViewer.removeChild(newUploadBtn);
        });   
    }
}

module.exports = ImageUpload;