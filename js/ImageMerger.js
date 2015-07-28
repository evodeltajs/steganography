(function() {

"use strict";

function ImageMerger(ImageResult1, ImageResult2) {
  	this.sizes = ImageResult1.data.length;
    this.ImageResult1 = ImageResult1;
  	this.ImageResult2 = ImageResult2;

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

        this.ImageResult1.data[i] = this.ImageResult1.data[i] >> 2  <<2;
        finalImage[i] = this.ImageResult1.data[i] + aux[i];
      }

      var ImageFinal = new ns.ImageResult(this.sizes);
      ImageFinal.data = finalImage;


      /*console.log(aux);
      console.log("Result:");
      console.log(finalImage);
      
      
      console.log("Done.");
      */
      return ImageFinal;
   
    };
  
}
ns.imageMerger = ImageMerger;


}()); 