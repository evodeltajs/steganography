(function() {

	"use strict";

	var ImageReader = ns.ImageReader;
	var ImageViewer = ns.ImageViewer;
	var ImageMerger = ns.ImageMerger;
	var ImageUnmerger = ns.ImageUnmerger;

	var imageReaderFirst, imageReaderSecond, imageReaderMerged;
	var inputImageViewerFirst, inputImageViewerSecond, inputMergeView, outputUnmergeViewFirst, outputUnmergeViewSecond; 	
 	var imageDataFirst, imageDataSecond;

	init();

	function init() {
		initImageReaders();
		initImageViewers();		
	}

	function initImageReaders() {

		var imagesLoaded = 0;
		var imageReaderContainer1 = document.getElementById("imageReaderFirst");
		var imageReaderContainer2 = document.getElementById("imageReaderSecond");
		imageReaderFirst = new ImageReader(imageReaderContainer1);
		imageReaderSecond = new ImageReader(imageReaderContainer2);	


		imageReaderFirst.onImageReceived = function(imageData) {

			inputImageViewerFirst.setImage(imageData);
			imageDataFirst = imageData;
			imagesLoaded += 1;
	 	
		 	if(imagesLoaded === 2) {

				var rezImg = initImageMerger(imageDataFirst,imageDataSecond);
				initMergeView(rezImg);
			}
			else{
			 	// console.log ("You need to input two files!");
			}

		};

		imageReaderFirst.init();

		imageReaderSecond.onImageReceived = function(imageData) {

			inputImageViewerSecond.setImage(imageData);
			imageDataSecond = imageData;
			imagesLoaded += 1;

			if(imagesLoaded === 2){
			 	
				var rezImg = initImageMerger(imageDataFirst,imageDataSecond);
				initMergeView(rezImg);
			}
			else {
			 	// console.log ("You need to input two files!");
			}
		};

		imageReaderSecond.init();
	}

	function initImageViewers() {

		var inputImageViewerContainerFirst = document.getElementById("inputImageViewerFirst");
		var inputImageViewerContainerSecond = document.getElementById("inputImageViewerSecond");

		inputImageViewerFirst = new ImageViewer(inputImageViewerContainerFirst);
		inputImageViewerFirst.init();

		inputImageViewerSecond = new ImageViewer(inputImageViewerContainerSecond);
		inputImageViewerSecond.init();
	}

	function initImageMerger(imageDataFirst,imageDataSecond) {

		var imageMergerExecution =  new ImageMerger(imageDataFirst, imageDataSecond);
		var result = imageMergerExecution.merge();
		
		return result;
	}

	function initMergeView(mergedImageData) {

		var imageContainerMerge = document.getElementById("imageMergerFinal");
		inputMergeView = new ImageViewer(imageContainerMerge); 
		inputMergeView.setFinal(mergedImageData);

		initImageUnmerger(mergedImageData); 
	}

	function initImageUnmerger(mergedImageData) {
 
		var imageUnmerger = new ImageUnmerger(mergedImageData);
		var unmergedArray = imageUnmerger.unmerge();	
		initUnmergeView(unmergedArray);
	}

	function initUnmergeView(unmergedArray) {
 
		var imageContainerUnmergeFirst = document.getElementById("imageUnmergeFirst");
		var imageContainerUnmergeSecond = document.getElementById("imageUnmergeSecond");

		outputUnmergeViewFirst = new ImageViewer(imageContainerUnmergeFirst);
		outputUnmergeViewSecond= new ImageViewer(imageContainerUnmergeSecond);

		outputUnmergeViewFirst.setFinal(unmergedArray[0]);
		outputUnmergeViewSecond.setFinal(unmergedArray[1]);
	
	}
 
}());