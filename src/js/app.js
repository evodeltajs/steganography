"use strict";

var ImageReader = require("./image/ImageReader");
var ImageViewer = require("./image/ImageViewer");
var ImageMerger = require("./image/ImageMerger");
var ImageUnmerger = require("./image/ImageUnmerger");
var ImageUpload = require("./image/ImageUpload");
var MergeButton = require("./image/MergeButton");
var RefreshButton = require("./image/RefreshButton");
var DownloadButton = require("./image/DownloadButton");
var ImageSize = require("./image/ImageSize");
var ErrorBox = require("./image/ErrorBox");

var imageReaderFirst, imageReaderSecond, imageReaderMerged;
var inputImageViewerFirst, inputImageViewerSecond, inputMergeView, outputUnmergeViewFirst, outputUnmergeViewSecond; 	
var imageDataFirst, imageDataSecond;
var imagesLoaded = 0;
var imageLoadedFirst = 0;
var imageLoadedSecond = 0;
var btnMergeOn = true;
var imageUploadFirst, imageUploadSecond;
var sizesFirst, sizesSecond ;
var errMsgFirst, errMsgSecond ,errMsgMerge;
var flagFirst = false;

init();

function init() {	

	var FirstImage = document.getElementById("FirstImage");
	var SecondImage = document.getElementById("SecondImage");
	initImageUpload(FirstImage, SecondImage);

	var idRefresh = document.getElementById("refreshBtn");
	var refreshBtn = new RefreshButton(idRefresh);
	
}


function initImageUpload(firstImageContainer, secondImageContainer) {

	var imageUploadContainerFirst = document.createElement("div");
	var imageUploadContainerSecond = document.createElement("div");

	imageUploadContainerFirst.className = "imageUploadFirst";
	imageUploadContainerSecond.className = "imageUploadSecond";

	imageUploadFirst = new ImageUpload(imageUploadContainerFirst, "firstUpload" ); 
	imageUploadSecond  = new ImageUpload(imageUploadContainerSecond, "secondUpload");

	firstImageContainer.appendChild(imageUploadContainerFirst);
	secondImageContainer.appendChild(imageUploadContainerSecond);

	imageUploadFirst.initUploadButtons();
	imageUploadSecond.initUploadButtons();

	var ErrorBoxFirstImage = new ErrorBox(firstImageContainer);
	var ErrorBoxSecondImage = new ErrorBox(secondImageContainer);

	ErrorBoxFirstImage.init();
	ErrorBoxSecondImage.init();
	
	var btnMergeContainer = document.getElementById("btnMergeContainer");
	var mergeBtn = new MergeButton(btnMergeContainer);
	var ErrorBoxMergeButton = new ErrorBox(btnMergeContainer);

	ErrorBoxMergeButton.init();
	initBtnMerge();

	imageUploadFirst.onImageUpload = function(imageData) {
	 
		imageLoadedFirst += 1;

		if(imageLoadedFirst === 1) {
			imageDataFirst = imageData;
			onImagesLoaded();

		}
		else if(imageLoadedFirst ===2) {
			imageDataFirst = imageData;
			imageLoadedFirst = 1;
		}
	};

	imageUploadFirst.onSizesRecieved = function(sizes) {
		
		sizesFirst = sizes;
	}; 

	imageUploadFirst.onErrorMessageReceived = function(message) {

		if(message ==="OK") {
			ErrorBoxFirstImage.clear();
		}
		else {		 	 
			ErrorBoxFirstImage.setMessage( message);
		}
	};

	imageUploadSecond.onImageUpload = function(imageData) {

		imageLoadedSecond += 1;

		if(imageLoadedSecond === 1) {
			imageDataSecond = imageData;
			onImagesLoaded();
			
		}
		else if(imageLoadedSecond === 2) {
			imageDataSecond = imageData;
			imageLoadedSecond = 1;
		}
	};

	imageUploadSecond.onSizesRecieved = function(sizes) {

		sizesSecond = sizes;
	};

	imageUploadSecond.onErrorMessageReceived = function(message) {

		if(message ==="OK") {
			ErrorBoxSecondImage.clear();
		}
	 	else {
			ErrorBoxSecondImage.setMessage(message);
		}
	};

	mergeBtn.onErrorMessageReceived = function(message) {

		if(message === "OK") {
			ErrorBoxMergeButton.clear();
		}
		else {
			ErrorBoxMergeButton.setMessage(message);
		}

	};

	function onImagesLoaded() {

		imagesLoaded = imageLoadedFirst + imageLoadedSecond;
		if (imagesLoaded === 2) {
			mergeBtn.activate();
			imagesLoaded = 0;	
		}			
		else {
			 	// console.log ("You need to input two files!");
		} 
	}

	function initBtnMerge() {

		btnMergeContainer.addEventListener("click", function() {
			if (btnMergeOn) {
			 	var boolMerge = mergeBtn.validate(sizesFirst, sizesSecond);	

			 	if(boolMerge) {

					var rezImg = initImageMerger(imageDataFirst,imageDataSecond, sizesFirst, sizesSecond);
					initMergeView(rezImg);			

					btnMergeOn = false;	
					mergeBtn.deactivate();	
				}
				else {
					imagesLoaded = 0;
				}			 
			}			
		});
	}
}

function initImageMerger(imageDataFirst, imageDataSecond, sizesFirst, sizesSecond) {

	var imageMergerExecution =  new ImageMerger(imageDataFirst, imageDataSecond);
	var result = imageMergerExecution.merge();
	return result;
}

function initMergeView(mergedImageData) {
   
	var imageContainerMerge = document.getElementById("imageMergerFinal");
	inputMergeView = new ImageViewer(imageContainerMerge,sizesFirst); 
	inputMergeView.setFinal(mergedImageData);

	var canvasMerged = inputMergeView.getCanvas();
	var btnDown = new DownloadButton( imageContainerMerge.id, canvasMerged);

	initImageUnmerger(mergedImageData, sizesFirst, sizesSecond);
 
}

function initImageUnmerger(mergedImageData, sizesFirst, sizesSecond) {

	var imageUnmerger = new ImageUnmerger(mergedImageData, sizesFirst);
	var unmergedArray = imageUnmerger.unmerge();	
	initUnmergeView(unmergedArray, sizesFirst, sizesSecond);
}

function initUnmergeView(unmergedArray, sizesFirst, sizesSecond) {

	var imageContainerUnmergeFirst = document.getElementById("imageUnmergeFirst");
	var imageContainerUnmergeSecond = document.getElementById("imageUnmergeSecond");

	outputUnmergeViewFirst = new ImageViewer(imageContainerUnmergeFirst, sizesFirst);
	outputUnmergeViewSecond= new ImageViewer(imageContainerUnmergeSecond, sizesSecond);

    outputUnmergeViewFirst.setFinal(unmergedArray[0]);
	outputUnmergeViewSecond.setFinal(unmergedArray[1]);

	var canvasUnmergedFirst = outputUnmergeViewFirst.getCanvas();
	var canvasUnmergedSecond = outputUnmergeViewSecond.getCanvas();
	 
 	var btnDownFirst = new DownloadButton( imageContainerUnmergeFirst.id, canvasUnmergedFirst);
	var btnDownSecond = new DownloadButton(imageContainerUnmergeSecond.id, canvasUnmergedSecond);
}