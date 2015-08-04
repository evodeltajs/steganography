"use strict";

var ImageSize = require("./ImageSize");

function ImageReader(container) {
    var that = this;
   
    this.onImageReceived = function() {};
    this.onSizeRecieved = function() {};

    this.init = function() {

        var reader, canvas, ctx;
        var inputElement = document.createElement("input");
        inputElement.setAttribute("type", "file");
        container.appendChild(inputElement);

        var btnElement = document.createElement("button");
        btnElement.type = "button";
        btnElement.innerText = "Load";
        btnElement.addEventListener("click", handleFiles);
        container.appendChild(btnElement);        

        function handleFiles(ev) {

            var file = inputElement.files[0];

            if (file) {
                reader = new FileReader();
                canvas = document.createElement("canvas");
                ctx = canvas.getContext("2d");

                reader.readAsDataURL(file);
                reader.onload = function(event) {

                    var img = new Image();
                    img.onload = function() {
                        canvas.width = img.width;
                        canvas.height = img.height;

                        ctx.drawImage(img,0,0);

                        var imageData = ctx.getImageData(0, 0, img.width, img.height);
                        that.onImageReceived(imageData);

                        var sizes = new ImageSize(canvas.width,  canvas.height); 
                        that.onSizeRecieved(sizes);   
           
                    };

                    img.src = event.target.result;
                };            
            }
        }
    };    
}

module.exports = ImageReader;