(function() {

"use strict";


function ImageUnmerger (sizes) {
  	this.sizes = sizes;
    this.inputImage= new ImageResult(sizes);
  	 
}

ImageUnmerger.prototype.unmerge = function(){

	console.log(this.inputImage);

	var size = this.inputImage.data.length;
	var firstAux = new Uint8ClampedArray(size);
	var secondAux = new Uint8ClampedArray(size);

	var firstOutput = new ImageResult(size);
	var secondOutput = new ImageResult(size);

    var temp = new Uint8ClampedArray(size);

	for (var i=0; i<size; i++) {

		firstAux[i] = 0;
		secondAux[i] = 0;	
		temp[i] =0;
	}
 	
	for (var i=0; i<size; i++) {

		temp[i] = this.inputImage.data[i];
		temp[i] = (temp[i] >> 2 << 2);
		firstAux[i] = temp[i];
		secondAux[i] = temp[i] ^ this.inputImage.data[i];
		secondAux[i] = secondAux[i] * 64;
	}

    firstOutput.data = firstAux;
	secondOutput.data = secondAux;

	return [firstOutput, secondOutput];
}  

})(); 