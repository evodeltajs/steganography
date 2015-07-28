(function() {
	"use strict";

	var ImageReader = ns.ImageReader;
	var ImageViewer = ns.ImageViewer;

	var imageReader1, inputImageViewer1;

	init();

	function init() {
		initImageReaders();
		initImageViewers();
	}

	function initImageReaders() {
		var imageReaderContainer1 = document.getElementById("imageReader1");
		imageReader1 = new ImageReader(imageReaderContainer1);

		imageReader1.onImageReceived = function(imageData) {
			inputImageViewer1.setImage(imageData);
		};

		imageReader1.init();
	}

	function initImageViewers() {
		var inputImageViewerContainer1 = document.getElementById("inputImageViewer1");
		inputImageViewer1 = new ImageViewer(inputImageViewerContainer1);
		inputImageViewer1.init();
	}

}());