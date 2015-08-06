"use strict";

function RefreshButton(container) {

	var btnRefresh = document.createElement("button");
	btnRefresh.type = "button";
	btnRefresh.className = "refresh-button";
	btnRefresh.innerText = "Refresh";
	document.getElementById(container.id).appendChild(btnRefresh);

	btnRefresh.addEventListener("click",function() {
 		location.reload();
	});
}

module.exports = RefreshButton;