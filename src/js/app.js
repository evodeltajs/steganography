"use strict";

var MergeController = require("./controls/MergeController");
var UnmergeController = require("./controls/UnmergeController");

var pathname = window.location.pathname;

window.addEventListener("load", init, false);


function init() {
	
	var appId = document.getElementsByTagName("html")[0].getAttribute("app-id");
	
	if(appId === "merge") { 
		startMergeController();
	}
	else if(appId === "unmerge") {
		startUnmergeController();
	}
	 
}

function startMergeController() {
	var mergeController = new MergeController();
}

function startUnmergeController() {
	var unmergeController = new UnmergeController();
}
