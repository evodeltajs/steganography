"use strict";

var ImageReader = require("./ImageReader");
var ImageViewer = require("./ImageViewer");
var UrlReader = require("./UrlReader");

function ImageUpload(container, className) {

    var that = this;
    this.onImageUpload = function() {};
    this.onSizesRecieved = function() {};
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
        var divReader =  document.createElement("div");
        divReader.className =  className;

        var reader = new ImageReader(divReader);
        reader.init();

        imageContainer.appendChild(divReader);

        reader.onImageReceived = function(imageData) {           

            var newUploadBtn;
            var divViewer = document.createElement("div");
            divViewer.className = "viewer";
            var imageDataThis = imageData;

            reader.onSizeRecieved = function(size) {

                var sizes = size;
                inputImageViewer = new ImageViewer(divViewer, sizes);
                inputImageViewer.init();

                imageDataThis = inputImageViewer.setImage(imageDataThis);
                 
                imageContainer.removeChild(divReader);                   
                imageContainer.appendChild(divViewer);

                divViewer.addEventListener("mouseenter", function() {

                    newUploadBtn = document.createElement("button");
                    newUploadBtn.className = "uploadBtn";
                    newUploadBtn.innerHTML = "New Upload";
                    divViewer.appendChild(newUploadBtn);

                    newUploadBtn.addEventListener("click", function() {

                            imageContainer.removeChild(divViewer);                      
                            imageContainer.appendChild(divReader);

                        });

                });

                that.onImageUpload(imageDataThis);
                that.onSizesRecieved(sizes);

                divViewer.addEventListener("mouseleave", function() {

                    divViewer.removeChild(newUploadBtn);
                });                
            };  
        };
	};

    //For URL view
    this.initURL = function() {
        
        var divURL = document.createElement("div");
        divURL.className = "url-reader";

        var urlReader = new UrlReader(divURL);
        urlReader.init();

        imageContainer.appendChild(divURL);
    }; 

    //to clear the image-container of children
    this.clean = function() {

        while(imageContainer.firstChild) {
            imageContainer.removeChild(imageContainer.firstChild);
        }
    };

}

module.exports = ImageUpload;