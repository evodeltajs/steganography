"use strict";

var ImageSize = require("./ImageSize");

function UrlReader(container, urlLink) {
    var that = this;

    this.onImageReceived = function() {};
    this.init = function() {

        var reader, canvas, ctx;
    	var urlField = document.createElement("input");
        var urlBtn = document.createElement("button");
        urlBtn.innerHTML = "Load";

    	container.appendChild(urlField);
   		container.appendChild(urlBtn);

   		// console.log(urlLink);
        //https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/pie.png


        urlBtn.addEventListener("click", function() {
            
        	//regexes...
            if(urlField.value !== "") {

	            var url = urlField.value;

	            canvas = document.createElement("canvas");  
                ctx = canvas.getContext("2d");
             
                var img = new Image();
                // var img = document.createElement("image");
                    
                // container.appendChild(img);
                container.removeChild(urlField);
                container.removeChild(urlBtn);

                img.onload = function() {
                    
                    canvas.width = img.width;
                    canvas.height = img.height;
                    console.log(canvas.width +" " + canvas.height);
                    ctx.drawImage(this,0,0);
                    console.log(canvas);
                    var imageData = ctx.getImageData(0, 0, img.width, img.height);
                    that.onImageReceived(imageData);

                    // console.log(imageData);                    
                };
                img.crossOrigin = "Anonymous";  
                img.src = url;

                container.appendChild(canvas);
                
            }
			else {
				alert("Input a link");
			}
        });
    };
}

module.exports = UrlReader;