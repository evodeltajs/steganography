"use strict";

var MergeController = require("./image/MergeController");
var UnmergeController = require("./image/UnmergeController");

var pathname = window.location.pathname;

window.addEventListener("load", init, false);
 
function init() {
	
	if(pathname ==="/"){
		startMergeController();
	}
	else if(pathname === "/index.html") {
		startMergeController();
	}
	else if(pathname === "/unmerge.html") {
		startUnmergeController();
	}
}

function startMergeController() {
	var mergeController = new MergeController();
}

function startUnmergeController() {
	var unmergeController = new UnmergeController();
}
