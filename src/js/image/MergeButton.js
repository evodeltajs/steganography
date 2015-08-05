"use strict";

function MergeButton(container) {

	var btnMerge = document.createElement("button");
	btnMerge.type = "button";
	btnMerge.innerText = "Merge";

	document.getElementById("btnMerge").appendChild(btnMerge);
	btnMerge.disabled = true;

	this.activate = function() {

		btnMerge.disabled = false; 
	};

	this.deactivate = function() {

		btnMerge.disabled = true;
	};
 
}

module.exports = MergeButton;