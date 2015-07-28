var container = document.getElementById('divId');
var a = new ImageReader(container);
a.onImageReceived = function(data) {
	console.log(data);
};
a.init();

function ImageReader(container) {
	this.onImageReceived = function() {};

	this.init = function() {

		var inputElement = document.createElement("input");
		inputElement.setAttribute("type", "file");
        document.getElementById("selectImage").appendChild(inputElement);

		document.getElementById("loadBtn").addEventListener("click", handleFiles);
        var reader, canvas, ctx;

        function handleFiles(ev) {

            var file = inputElement.files[0];

            if (file) {
            reader = new FileReader();
            canvas = document.getElementById('imageCanvas');
            ctx = canvas.getContext('2d');

            reader.onload = function(event) {

                var img = new Image();
                img.onload = function() {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img,0,0);

                    var imageData = ctx.getImageData(0, 0, img.width, img.height);
                    this.onImageReceived(imageData.data);
                };

                img.src = event.target.result;
            };

            reader.readAsDataURL(file);
            }
        }
    };
}