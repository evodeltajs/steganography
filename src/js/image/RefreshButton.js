"use strict";

function RefreshButton(container) {

	var btnRefresh = document.createElement("a");
	// btnRefresh.type = "button";
	// btnRefresh.className = "refresh-button"; 

	document.getElementById(container.id).appendChild(btnRefresh);

	container.addEventListener("click",function() {
 		location.reload();
	});
}

module.exports = RefreshButton;