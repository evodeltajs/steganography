"use strict";

var ImageSize = require("./ImageSize");

function UrlReader(container, urlLink) {
    var that = this;
    
    this.onImageReceived = function() {};
    this.onSizeRecieved = function() {};
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
                var xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function() {

                    if(xhr.readyState === 4) {
                        if(xhr.status === 200) {
                         
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
                                ctx.drawImage(this,0,0);
                                
                                var imageData = ctx.getImageData(0, 0, img.width, img.height);

                                
                                that.onImageReceived(imageData);  

                                var sizes = new ImageSize(canvas.width, canvas.height);
                                that.onSizeRecieved(sizes);              
                            };

                            img.crossOrigin = "Anonymous";  
                            img.src = url;
                            // container.appendChild(canvas);
                        }
                        else {
                            handleError();
                        }
                    }

                };

                xhr.open("GET", url, true);
                xhr.send();

            }
			else {
				alert("Input a link");
			}
        });
    };

    function handleError(){
        console.log("Cannot load that image, find another");
    }


}

module.exports = UrlReader;