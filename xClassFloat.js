
class AllFloaters {   
  
 floatArr = [];     // floatA [[element, initTop, initLeft, numMoves, incT, incL, fadeTime, fadePoints],[]]// 8
 singleFloaters = [];
  
  constructor(floatA) {   
     if (floatA) {this.floatArr = floatA;}
    for (var x = 0; x < this.floatArr.length; x++){ 
      this.singleFloaters[x] = new Floater(this.floatArr[x]);    
    }    
  }    
 
  get floatArr(){return this.floatArr;}    
}      // end class AllFloaters


/// setup for random files:  gDoor.signs=["DOOR/SIGNS/", 23]; [[num is 1 less than folder count]]  then use "R" in anime
 

class Floater{
  
  actionArr = []; 
  callBack = 0;
  transF = "rotateY(0deg)";
     
  constructor(actionA) {
    if (actionA) {
      this.actionArr = actionA;   //[element, initTop, initLeft, numMoves, incT, incL, fadeTime, fadePoints, [swap files], Ydeg]// 10
       this.startAction();           }        
  }    // end constructor
    
  
  ///////////////////////////  HOW DOES THIS GET RECALLED??? VIA fadeWait()
  //[element, initTop, initLeft, numMoves, incT, incL, fadeTime, fadePoints, [swap files], rotateYdeg]// 10
  startAction(){
    let el = this.actionArr[0];  // page element moving
   
    //INIT THE TOP
    if(Array.isArray(this.actionArr[1])){   
      var startTop = this.actionArr[1];
      // does it have a random start pos?  this.actionArr[1] like [-20, 400]
      if(startTop[0]===startTop[1]){ 
        document.getElementById(el).style.top = String(startTop[0])+ "px"; 
      } else {
        let range = Math.abs(startTop[1] + startTop[0]);
          ///find a ran of that[0], then set it
        let randNum = gFile.getRandomNum(range);
        let topLoc = randNum + startTop[0]; // lower/up it by lowest val, may be negative
    
        document.getElementById(el).style.top = String(topLoc) + "px"; 
        }
      
    }else{  ////LEGACY
      document.getElementById(el).style.top = String(this.actionArr[1])+ "px";
    }
     
     //INIT THE LEFT & OPAC & 
    document.getElementById(el).style.left = String(this.actionArr[2])+ "px";
    document.getElementById(el).style.opacity =  0;
   
    
        // VERTICAL MOVE
    if(this.actionArr[4]){ gBeatEngine.animArray.push(new Animator(el, this.actionArr[3], this.actionArr[4], "T")); }
       // HORIZ MOVE
    if(this.actionArr[5]){gBeatEngine.animArray.push(new Animator(el, this.actionArr[3], this.actionArr[5], "L"));}    
  
       // FADE IN + callback to FADE OUT         
    if(this.actionArr[6]){  // FADE numMoves
      this.callBack = "fadeOut";      
      let mover = new Animator(el, this.actionArr[6], this.actionArr[7], "F", 0, 0, [this, this.callBack] );         
      gBeatEngine.animArray.push(mover);
    }      
    
    //  SWAPPING random IMAGES?
     if(this.actionArr[8]){  // file lister           
      let ranSwapper = new Animator(el, this.actionArr[3], 0, "R", this.actionArr[8] );         
      gBeatEngine.animArray.push(ranSwapper);
    }
    
    //// ROTATE         ***gotta gen this for X too
     if(this.actionArr[9]){      
       
       ////  don't reset if it already has a value
        document.getElementById(el).style.transform = this.transF;  ///init rotateY
    
       
       //should it hold it's own count of how far it's rotated?
       //how does el also hold this to start at that pos next animation start?
       //di I want that?
       /// restarts in fadewait
       
       // overloading increments with rotateYdeg
       this.callBack = "settransF";
       let rotator = new Animator(el, this.actionArr[3], this.actionArr[9], "Y", 0, 0, [this, this.callBack] );
       gBeatEngine.animArray.push(rotator);
     }
             
      
    
  }  //END startAction
  
//  move the fades into one method  
   
  fadeOut(){       //fade out, then setup wait period                  
    let el = this.actionArr[0];
    this.callBack = "fadeWait";
    let fadeO = new Animator(el, this.actionArr[6], -this.actionArr[7], "F",0, 0, [this, this.callBack] );                                    
     gBeatEngine.animArray.push(fadeO);  
  }
  
  
   fadeWait(){  //RANDOM WAIT  before float again
     let el = this.actionArr[0];
     this.callBack = "startAction";             
     let waitArray = [4,40,80,130,200,300,380,500];
     let randNum = gFile.getRandomNum(waitArray.length); 
     let nMoves = waitArray[randNum];         
     let fadeW = new Animator(el, nMoves, 0, "N", 0, 0, [this, this.callBack] );                 
     gBeatEngine.animArray.push(fadeW);      
    }
  
  settransF(){
    let el = this.actionArr[0];  // page element moving
    
    // is it more than 360?
     var oldStr = document.getElementById(el).style.transform;
      var oldArr = oldStr.split("(");
      var oldArr2 = oldArr[1].split("d");
      var oldInt = parseInt(oldArr2[0]);
    if(oldInt>360){   oldInt=oldInt-360;    }      
      var newStr = String(oldInt);
      var tranString = "rotateY(" + newStr + "deg)" ;    
    
    this.transF = tranString;
  }
  
}    //end class Floater




