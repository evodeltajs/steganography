"use strict";

var MergeController = require("./image/MergeController");
var UnmergeController = require("./image/UnmergeController");

var pathname = window.location.pathname;
 
if(pathname === "/"){
	startMergeController();
}
else if(pathname === "/unmerge.html"){
	startUnmergeController();
}

function startMergeController(){

	var mergeController = new MergeController();
}

function startUnmergeController(){
	var unmergeController = new UnmergeController();
}
