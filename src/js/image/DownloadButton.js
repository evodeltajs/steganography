"use strict";

function DownloadButton(id,canvas) {

	var container = document.getElementById(id);	
	var downloadBtn = document.createElement("a");

	container.addEventListener("mouseenter", function() {
    	
    	downloadBtn.className = "downloadBtn";
    	downloadBtn.innerHTML = "Download";
    	
    	container.appendChild(downloadBtn);

    	downloadBtn.addEventListener("click", function() {

    		downloadBtn.href = canvas.toDataURL();
    		downloadBtn.download = "image.png";

    	}, false);
	});
	// container.addEventListener("mouseleave",function(){

	// 	container.removeChild(downloadBtn);
	// });    
}

module.exports = DownloadButton;