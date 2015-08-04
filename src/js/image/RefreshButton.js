"use strict";

function RefreshButton(){

	var btnRefresh = document.createElement("button");
	btnRefresh.type = "button";
	btnRefresh.innerText = "Refresh";

	document.getElementById("refreshBtn").appendChild(btnRefresh);


	btnRefresh.addEventListener("click",function(){


 	location.reload();

	});
}

module.exports = RefreshButton;