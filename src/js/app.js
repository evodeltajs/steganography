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

var imageReaderFirst, imageReaderSecond, imageReaderMerged;
var inputImageViewerFirst, inputImageViewerSecond, inputMergeView, outputUnmergeViewFirst, outputUnmergeViewSecond; 	
var imageDataFirst, imageDataSecond;
var imagesLoaded = 0;
var btnMergeOn = true;
var imageUploadFirst, imageUploadSecond;
var sizesFirst, sizesSecond ;

init();

function init() {	

	initImageUpload();
	var idRefresh = document.getElementById("refreshBtn");
	var refreshBtn = new RefreshButton(idRefresh);
	
}


function initImageUpload() {
	var imageUploadContainerFirst = document.getElementById("imageUploadFirst");
	var imageUploadContainerSecond = document.getElementById("imageUploadSecond");

	imageUploadFirst = new ImageUpload(imageUploadContainerFirst, "firstUpload" ); 
	imageUploadSecond  = new ImageUpload(imageUploadContainerSecond, "secondUpload");

	imageUploadFirst.initUploadButtons();
	imageUploadSecond.initUploadButtons();

	var mergeBtn = new MergeButton();
	var btnMerge = document.getElementById("btnMerge");

	initBtnMerge();

	imageUploadFirst.onImageUpload = function(imageData) {
		imageDataFirst = imageData;
		onImagesLoaded();
	};

	imageUploadFirst.onSizesRecieved = function(sizes) {
		sizesFirst = sizes;
		// console.log(sizesFirst);
	}; 

	imageUploadSecond.onImageUpload = function(imageData) {
		imageDataSecond = imageData;
		onImagesLoaded();
	};

	imageUploadSecond.onSizesRecieved = function(sizes) {
		sizesSecond = sizes;
		// console.log(sizesSecond);
	};

	function onImagesLoaded() {
		imagesLoaded +=1;

		if (imagesLoaded === 2) {
			mergeBtn.activate();
		}			
		else {
			 	// console.log ("You need to input two files!");
		} 
	}

	function initBtnMerge() {
		btnMerge.addEventListener("click", function() {
			if (btnMergeOn) {
			 	// console.log(sizesFirst + " " + sizesSecond);
				var rezImg = initImageMerger(imageDataFirst,imageDataSecond, sizesFirst, sizesSecond);
				initMergeView(rezImg);

				imagesLoaded = 0;	

				btnMergeOn = false;					 
			}			
		});
	}
}


function initImageMerger(imageDataFirst, imageDataSecond, sizesFirst, sizesSecond) {

	// console.log(sizesFirst.width + " "+sizesFirst.height + " " + sizesSecond.width + " " + sizesSecond.height);
	var imageMergerExecution =  new ImageMerger(imageDataFirst, imageDataSecond);
	var result = imageMergerExecution.merge();
	// console.log(result);
	return result;
}

function initMergeView(mergedImageData) {
	if (sizesFirst.width > 1024 || sizesSecond.width >1024 || sizesFirst.height >1024 || sizesSecond.height > 1024) {
		console.log("Images are too big!");
	}

	else if (sizesFirst.width == sizesSecond.width && sizesFirst.height == sizesSecond.height) {
		
		console.log("Same sizes, proceed");
		var imageContainerMerge = document.getElementById("imageMergerFinal");
		inputMergeView = new ImageViewer(imageContainerMerge,sizesFirst); 
		inputMergeView.setFinal(mergedImageData);

		var canvasMerged = inputMergeView.getCanvas();
		// console.log(canvasMerged);
		var btnDown = new DownloadButton( imageContainerMerge.id, canvasMerged);

		initImageUnmerger(mergedImageData, sizesFirst, sizesSecond);
	}
	else {
		console.log("Images are not of same size");
	}
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
	// console.log(canvasUnmergedFirst);
	// console.log(canvasUnmergedSecond);
	var btnDownFirst = new DownloadButton( imageContainerUnmergeFirst.id, canvasUnmergedFirst);
	var btnDownSecond = new DownloadButton(imageContainerUnmergeSecond.id, canvasUnmergedSecond);
}