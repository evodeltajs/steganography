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
   
        urlBtn.addEventListener("click", function(){
            
        	//regexes...
            if(urlField.value !== ""){

	            var url = urlField.value;

	            canvas = document.createElement("canvas");  
                ctx = canvas.getContext("2d");

             
                var img = new Image();
                // var img = document.createElement("image");
                img.crossOrigin = "anonymous";                
                //container.appendChild(img);
                container.removeChild(urlField);
                container.removeChild(urlBtn);


                img.onload = function() {
                    
                    canvas.width = ImageSize.width;
                    canvas.height = ImageSize.height;

                    console.log(canvas.width +" " + canvas.height);

                    ctx.drawImage(img,0,0);

                    var imageData = ctx.getImageData(0, 0, img.width, img.height);
                    that.onImageReceived(imageData);

                    console.log(imageData);
                    
                };

                container.appendChild(canvas);
                 
            }

			else{
				alert("Input a link");
			}

        });
 
   

    };
}

module.exports = UrlReader;