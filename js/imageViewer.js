var ns = ns || {};
function ImageViewer(container, imageResult) {
	this.init = function() {
		container.appendChild(canvas);
	}
}

function init(size) {
	var canvasImageViewer = document.createElement("canvas");
	var ctx = canvasImageViewer.getContext("2d");
	canvasImageViewer.width = size;
	canvasImageViewer.height = size;
	canvasImageViewer.setAttribute("id", "canvasImageViewer");
	document.body.appendChild(canvasImageViewer);

}
	
function canvasLoadImage() {
	init(256);
	var c = document.getElementById("canvasImageViewer");
	var ctx = c.getContext("2d");
	var imgData = ctx.createImageData(256, 256);
	var arr = {
			imageResult : function imageResult(){
		for (i = 0; i < imgData.data.length; i += 4) {
		    
		    imgData.data[i+0] = 10;
		    imgData.data[i+1] = 224;
		    imgData.data[i+2] = 32;
		    imgData.data[i+3] = 255;
		}
	}
}
		arr.imageResult();
		ctx.putImageData(imgData, 0, 0);
		
 }

 canvasLoadImage();