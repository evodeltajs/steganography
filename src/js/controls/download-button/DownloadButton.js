"use strict";

var $ = require("jquery");

function DownloadButton(container) {
    var that = this;

    var $container = $(container);
	var $downloadBtn = $("<a class='download-btn fill'>Download</a>");

    this.canvas = null;

    $container.off("mouseenter.downloadBtn");
    $container.off("mouseleave.downloadBtn");

 	$container.on("mouseenter.downloadBtn", function() {        
        if (that.canvas) {
            that.show();
        }
    });

    $container.on("mouseleave.downloadBtn", function() {
        that.hide();
    });

    $container.append($downloadBtn);

    $downloadBtn.on("click", function() {
        var downloadBtn = $(this)[0];

        if (that.canvas) {
        	downloadBtn.href = that.canvas.toDataURL();
        	downloadBtn.download = "image.png";
        }
    });
	 
    this.setCanvas = function(canvas) {
        this.canvas = canvas;
    };

    this.show = function() {
        $downloadBtn.show();
    };

    this.hide = function() {
        $downloadBtn.hide();
    };
}

module.exports = DownloadButton;