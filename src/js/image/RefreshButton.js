"use strict";

function RefreshButton(container) {
	var btnRefresh = document.createElement("a");

	container.appendChild(btnRefresh);

	container.addEventListener("click",function() {
 		location.reload();
	});
}

module.exports = RefreshButton;