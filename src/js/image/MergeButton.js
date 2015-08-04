"use strict";

function MergeButton(){
	var btnMerge = document.createElement("button");
	btnMerge.type = "button";
	btnMerge.innerText = "Merge";

	document.getElementById("btnMerge").appendChild(btnMerge);

	btnMerge.disabled = true;

	this.activate = function(){
		btnMerge.disabled = false;
		// btnMerge.addEventListener("click", function() {
		// 	flag = true;
		// 	that.validate(true);
		// });
	};

	this.deactivate = function(){
		btnMerge.disabled = true;
	};

	// this.validate = function(flag){
	// 	return flag;		
	// };
}

module.exports = MergeButton;