


class Enviro { 
  visits = 0;  
  constructor(visits) {
  if (visits) {this.visits= visits;}
}    
  get visits() {    return this.visits;  } 
}

class Xfile {
  constructor() {  } 
  
  
  
  ////                            get / set properties
  
  
 
getElProps(element, propNamesArr){          ///  top, left, width, height, opac    
     var el = document.getElementById(element);
     var elStyle = window.getComputedStyle(el);
     
     var propValsArr = [];     
     propNamesArr.forEach(item =>  propValsArr.push(elStyle.getPropertyValue(item)) );
                  
     return [propValsArr];    
  }
  
  setElProps(element, propsObj){          ///  top, left, width, height, opac    ///not finished
     var el = document.getElementById(element);
     var elStyle = window.getComputedStyle(el);
     
    Object.entries(propsObj).forEach(([key, value]) => el.style[key] = value );
     
  }
  
  
  
  
    getLoc(element, leftTop) {
   var loc = (leftTop=="left" ) ? "left" : "top";
   var el = document.getElementById(element);
   var elStyle = window.getComputedStyle(el);
   return elStyle.getPropertyValue(loc).replace("px", "");
} 
  
  setLoc(element, leftTop, newLoc) {    ///    (element, "left", "800px")
    var el = document.getElementById(element);
    el.style[leftTop] = newLoc  ;            
} 
  
  
  
  /////                          MOVE      /position
  
   move(element, direction, distance=20) {
 //    console.log("in move, element: " + element);
   var el = document.getElementById(element);
   var topOrLeft = (direction=="left" || direction=="right") ? "left" : "top";
   if (direction=="up" || direction=="left") { distance *= -1; }
   var elStyle = window.getComputedStyle(el);
   var value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
   el.style[topOrLeft] = (Number(value) + distance) + "px";
}  
    

  
  
  
  
  ////    can i deprecate these?
   setTop (element, pixincs){  
        var el = document.getElementById(element);
        var elStyle = window.getComputedStyle(el);
        var leftVal = elStyle.getPropertyValue("left").replace("px", "");
        el.style.left = (Number(leftVal) + pixincs) + "px";      
     
     let elementLoc = document.getElementById(element).style.top;
     let newpix = String(parseFloat(elementLoc)+pixincs)+"px";
     document.getElementById(element).style.top = newpix;     
   }       
  
   setLeft (element, pixincs){  
        var el = document.getElementById(element);
        var elStyle = window.getComputedStyle(el);
        var leftVal = elStyle.getPropertyValue("left").replace("px", "");
        el.style.left = (Number(leftVal) + pixincs) + "px";          
   }   
  
  
  
  
  
  
    /////                          SIZE       /width - height
  
   resize(element, widthHeight, addition=20) {
     var el = document.getElementById(element);
     var elStyle = window.getComputedStyle(el);
     var oldValue = elStyle.getPropertyValue(widthHeight).replace("px", "");
     el.style[widthHeight] = (Number(oldValue) + addition) + "px";
}  
  
  
  getSize(element, widthHeight) {
   var el = document.getElementById(element);
   var elStyle = window.getComputedStyle(el);
   return elStyle.getPropertyValue(widthHeight).replace("px", "");
}  
  
  
  
  
    /////                          FADE
  
    setFade (element, pixincs){  
     var el = document.getElementById(element);
     var elStyle = window.getComputedStyle(el);
     var opVal = elStyle.getPropertyValue("opacity");
     el.style.opacity = String((Number(opVal) + pixincs)) ;
      
  //    console.log(`opacity ${element.style.opacity}`);
  //   let elementOpac = document.getElementById(element).style.opacity;
 //    let newpOpac = String(parseFloat(elementOpac)+pixincs);
   //  document.getElementById(element).style.opacity = newpOpac;    
    }  
  
  
  
  
  /////                          FILES  
  
  getRandomFile(folderPath, fileCount, filePrefix, fileExtension){      
    
  let randnum = Math.floor(Math.random() * fileCount);           
  if (randnum < 10){
    let randomFile = folderPath + filePrefix + String(parseInt(randnum)) + fileExtension;    
    return randomFile;
  } else {
    let randomFile = folderPath + String(parseInt(randnum)) + fileExtension;     
    return randomFile;
  }  }        ///////// end getRandomFile
  
  
  
    
  /////                          IMAGES  
  
  swapRandomImage(imageHolder, imagePath, imageCount, filePrefix, imageExtension ){   
    let randomImg = gFile.getRandomFile(imagePath, imageCount, filePrefix, imageExtension);    
    let oldImage = document.getElementById(imageHolder).nativeElement.src; 
    oldImage = oldImage.substring(oldImage.lastIndexOf('/') + 1);//the 2 URLs are different lengths
    let newImage = randomImg.substring(randomImg.lastIndexOf('/') + 1);       
    if (oldImage == newImage) {  return true;  } else{       
                              gFile.swapImage(imageHolder, randomImg);  }    ///new image so swap              
   }           ///////// end swapRandomImage
  
  
  
  swapImage(element, newImage){   document.getElementById(element).nativeElement.src = newImage;  }
  
  
  ////////// end images
  
  
  

  /////                          AUDIO  
  
  newAud(audfile, vol){
    let aud=new Audio(audfile);
    aud.volume = vol;
    return aud;
  }
  setVol (aud, vol) {   aud.volume = vol; }   // sets an audio obj
  stopAudio (audref, playbackPointer){audref.pause(); audref.currentTime = playbackPointer;}   

 /////                          NUMBERS  
  
  getRandomNum(topNum){  return Math.floor(Math.random() * topNum);    } // returns random num from 0 to topNum-1        
  
  isNumeric(num){  return !isNaN(num)}   
  
}




