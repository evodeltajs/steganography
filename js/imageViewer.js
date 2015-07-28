(function() {

	"use strict";

	var ImageDefaultSize = ns.ImageDefaultSize;

	function ImageViewer(container) {
		var canvasImageViewer;
		var ctx;
		var imageDataNew;
		this.init = function() {
			canvasImageViewer = document.createElement("canvas");
			ctx = canvasImageViewer.getContext("2d");

			canvasImageViewer.width = ImageDefaultSize;
			canvasImageViewer.height = ImageDefaultSize;

			container.appendChild(canvasImageViewer);

		};

		this.setImage = function(imageData) {			
			ctx.putImageData(imageData, 0, 0);			
		};
 		
 		this.setFinal = function(myData){
 			var canvas = document.createElement("canvas");
 			ctx = canvas.getContext("2d");

			canvas.width = ImageDefaultSize;
			canvas.height = ImageDefaultSize;

			container.appendChild(canvas);
 			var imageData = canvas.getContext("2d").createImageData(ImageDefaultSize, ImageDefaultSize);
 			imageData.data.set(myData);
 			ctx.putImageData(imageData,0,0);
 			// console.log(imageData);
 		}
	}

	ns.ImageViewer = ImageViewer;

}());
	
// function canvasLoadImage() {
// 	init(256);
// 	var c = document.getElementById("canvasImageViewer");
// 	var ctx = c.getContext("2d");
// 	var imgData = ctx.createImageData(256, 256);
// 	var arr = {
// 			imageResult : function imageResult(){
// 		for (i = 0; i < imgData.data.length; i += 4) {
		    
// 		    imgData.data[i+0] = 10;
// 		    imgData.data[i+1] = 224;
// 		    imgData.data[i+2] = 32;
// 		    imgData.data[i+3] = 255;
// 		}
// 	}
// }
// 		arr.imageResult();
// 		ctx.putImageData(imgData, 0, 0);
		
//  }

//  canvasLoadImage();