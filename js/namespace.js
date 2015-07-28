var ns = ns || {};

ns.ImageDefaultSize = 256;

// ns.ImageResult = function ImageResult(){
// 	this.data = new ImageData
//     // this.data = this.setPixels(4*size*size, 255);
// }

// ns.ImageMerger = ImageMerger(new ns.ImageResult(3), new ns.ImageResult(3));

 
/*    ns.ImageResult.prototype.setPixels = function generate(size){
	var newSize = size / 4;
	var arr = new Uint8ClampedArray(size); 
  	
  	for(var i=0; i < size; i++){
  		arr[i] = 0;
    } 
   	
   	for (i = 1; i <= newSize; i++) {  //actually, 2 fors

	    x = y = (i-1)*4;
	    r = Math.floor(Math.random() * 255 | 0);
	    g = Math.floor(Math.random() * 255 | 0);
	    b = Math.floor(Math.random() * 255 | 0); 	     
  
	 	index = x;  
	 	arr[index+0] = r;
	    arr[index+1] = g;
	    arr[index+2] = b;
	    arr[index+3] = 255;
	}

	return arr;
	
	}*/


 