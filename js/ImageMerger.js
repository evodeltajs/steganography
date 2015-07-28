(function() {

"use strict";

function ImageMerger(ImageData1, ImageData2) {
  	this.sizes =  ns.ImageDefaultSize;
    this.ImageResult1 = ImageData1;
  	this.ImageResult2 = ImageData2;

    this.merge = function(){
 
      // console.log(this.ImageResult1);
      // console.log(this.ImageResult2);
    
      var sizeImageResult2 = this.ImageResult2.data.length;
      var aux = new Uint8ClampedArray(sizeImageResult2);
      var finalImage = new Uint8ClampedArray(sizeImageResult2);
      // console.log(aux);

      for(var i =0; i<sizeImageResult2; i++){

        aux[i] = Math.floor(this.ImageResult2.data[i] / 64);
      
      // console.log(aux[i]);
      }
      
      var sizeImageResult1 = this.ImageResult1.data.length;
      for(var i=0; i<sizeImageResult1; i++){

        this.ImageResult1.data[i] = this.ImageResult1.data[i] >> 2  << 2;
        finalImage[i] = this.ImageResult1.data[i] + aux[i];
      }

      var ImageFinal = finalImage;
      


      /*console.log(aux);
      console.log("Result:");
      console.log(finalImage);
      
      
      console.log("Done.");
      */
      return ImageFinal;
   
    };
  
}
ns.ImageMerger = ImageMerger;


}()); 