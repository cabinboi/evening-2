
class Animator {  
  millsecTimer = 40; //ms = 25 frames/sec
  timeout = 0; 
  
  brokeoutElsArr = [];  /// holds the elements waiting for breakback
  breakBackArr = 0;      ///  the one arr being broke back to start pos
  elementArr = [];          /// big long thing with every onscreen element
  currElementArr = 0;      /// a single one of elementArr ^, in action, & [0] is the element name below ["Top1", topPath, topFileNums, origProps obj]
  element = 0;              /// one element name like "Top1"
  numMoves = 0;
  moveCounter = 0;
  pixincs = 0;  
  motion = 0;     
  
  fileArray=0;
  fileCounter=0;
  
  sequencer=0;
  callBack=0;
  waitingToPlay = 0;
  
  audArray=0; 
  specialArray = 0;  ///used now as [moveOutAudArr, moveBackAudArr]  for breakout [gFolderBase + "AUDIO/Brushs/58.ogg", gFolderBase + "AUDIO/Brushs/60.ogg"]
  
  
  ranCounter=0; /// use for anything, then zero
            
  constructor(elmntArr, numMovements, increments, whatMotion, files, sequence, callBack, audList, millsecs, specArr  ) {
 //   console.log("in an constr elArr: " + elmntArr);
    if (elmntArr) {this.elementArr = elmntArr;   }          ////  arr of arr's like [ ["Top1", topPath, topFileNums, propsObj], ...]
              ////  need to add the origPropsObj to each array here
    if (numMovements) {this.numMoves = numMovements;}
    if (increments) {this.pixincs = increments;}
    if (whatMotion) {this.motion = whatMotion;}
    if (files) {this.fileArray = files;  }
    if (sequence) {this.sequencer = sequence;   }
    if (callBack) {   this.callBack = callBack;   }   
    if (audList) {    this.audArray = audList;    }
    if (millsecs) {this.millsecTimer = millsecs;}  
    if (specArr) {this.specialArray = specArr;} 
}     
  
  anime(){        /////////   -- CHANGED in SHADS  ----ADD A CATCH FOR INFINITY, ONES MEANT TO KEEP SPINNING FOREVER
    
    if (this.numMoves > 100000) {  }    ////  NEVER STOP, ANIMATE TO INFIN
    else  {        
    if (this.moveCounter > this.numMoves) {      
      // this anim has ended, but is there sequence to follow, or a callback? // older callbacks
      if(this.sequencer){gBeatEngine.animArray.push( this.sequencer );}
      if(this.callBack){           
         ///  add catch for if right num of params there
        this.callBack[0](this.callBack[1], this.callBack[2]);  
       // this.callBack[0]();
      }          
      return 1;      } } //end this.moveCounter > this.numMoves
    
    
    ///////////////////  GET all THESE WORKING AS SWITCH
    switch (this.motion) {             
        
      case "ranImageAud":                 
        this.ranImageAud();                             
        break;  /// ranImageAud
        
        
      case "left":  
      case "right":  
      case "up":  
      case "down":  
       if(this.elementArr){
        this.element = this.elementArr[0][0];      
        gFile.move(this.element, this.motion, this.pixincs); 
       }
        break;           
        
      case "fadeUpDown": 
        this.element = this.elementArr[0][0];      
        if(this.moveCounter <= this.numMoves/2){           
          gFile.setFade(this.element, this.pixincs);
        } else {          
          gFile.setFade(this.element, this.pixincs * -1);
        }    
        break;     
        
        case "F":     // one way fader
           this.element = this.elementArr[0][0]; 
           gFile.setFade(this.element, this.pixincs);
        break;
           
      case "width":      //    resize(element, widthHeight, addition=20)
      case "height":            
        this.element = this.elementArr[0][0];      
        gFile.resize(this.element, this.motion, this.pixincs);               
        break;
                 
        
      case "ranSwap":                              
          this.ranCounter = Math.floor(Math.random() * this.elementArr.length);                          
          var randomImg = gFile.getRandomFile(gFolderBase + this.elementArr[this.ranCounter][1],  this.elementArr[this.ranCounter][2], gFilePrefix, gImageExtension)  ;  
          gFile.swapImage(this.elementArr[this.ranCounter][0], randomImg);  
          break;
        
      case "Y":         //    rotate Y                     
           this.element = this.elementArr[0][0];   
        //parse out the integers and add to this.pixincs  //  rotateY(0deg)      
        var oldStr = document.getElementById(this.element).style.transform;      
        var oldArr = oldStr.split("(");
        var oldArr2 = oldArr[1].split("d");
        var oldInt = parseInt(oldArr2[0]);
        var newInt = oldInt+this.pixincs;
        var newStr = String(newInt);
        var tranString = "rotateY(" + newStr + "deg)" ;                 
       document.getElementById(this.element).style.transform = tranString;    
          break;
        
      default:
    }
              
    
    
   /* 
    if (this.motion == "T"){gFile.setTop(this.element, this.pixincs); }    //MOVE V        
    
    if (this.motion == "L"){ 
      this.element = this.elementArr[0][0];            
      gFile.setLeft(this.element, this.pixincs);
  //    gFile.move(this.element, "left", this.pixincs)
    }    //MOVE H      */
          
    /*
    if (this.motion == "F"){    ///FADE IN/OUT -- one way fader
      this.element = this.elementArr[0][0]; 
      gFile.setFade(this.element, this.pixincs);
      console.log("in F element + opac: " + this.element + "  "  + document.getElementById(this.element).style.opacity );
    }
    */
    /*
    if (this.motion == "N"){ let p=0;       } //// DO NOTHING -- new in SHADS
    
    
    if (this.motion == "R"){         /////////////swap with a random file
      let ranSeeder = 40;    /// THIS RAN SEEDER NEEDS TO BE CARRIED THRU SOMEWHERE   
      if(gFile.getRandomNum(ranSeeder)<(ranSeeder/20)){                    
        //swapped this to get both to happen only if ran num ok --> look st this in AUD || both lines were outside    
        if(this.audArray){                  ////need a second aud array???
          if(gFile.getRandomNum(4)>2){
            let aud=gFile.newAud(this.audArray[0], 0.1); 
            aud.play();}
          }//audio simple yet
        
        /////have to deal with new array
         this.ranCounter = Math.floor(Math.random() * this.elementArr.length);      
        this.element = this.elementArr[this.ranCounter][0];
       // this.element = this.elementArr[0][0];                  
        gFile.swapRandomImage(this.element, this.fileArray[0]+this.elementArr[this.ranCounter][1], this.elementArr[this.ranCounter][2], gFilePrefix, gImageExtension);         
      }         
    }         
    
    if (this.motion == "S"){   //swap files in order 
      if(this.fileCounter > this.fileArray[1]-1){
        this.fileCounter=0;      } else{    
          if(this.audArray){if(gFile.getRandomNum(4)>2){let aud=gFile.newAud(this.audArray[0], 0.1); aud.play();}}//audio simple yet
          let fileStart=this.fileArray[0];
          if (this.fileCounter < 10){fileStart=fileStart + gFilePrefix;}         
          let newImage=fileStart + String(parseInt(this.fileCounter)) + gImageExtension;
          gFile.swapImage(this.element, newImage);
          this.fileCounter++;  }          }  
    
    if (this.motion == "Y"){       ////rotateY
      this.element = this.elementArr[0][0];   
      //parse out the integers and add to this.pixincs  //  rotateY(0deg)      
      var oldStr = document.getElementById(this.element).style.transform;      
      var oldArr = oldStr.split("(");
      var oldArr2 = oldArr[1].split("d");
      var oldInt = parseInt(oldArr2[0]);
      var newInt = oldInt+this.pixincs;
      var newStr = String(newInt);
      var tranString = "rotateY(" + newStr + "deg)" ;                 
     document.getElementById(this.element).style.transform = tranString;            
    }
    
    if (this.motion == "X"){   //////////////////rotateX    
      //parse out the integers and add to this.pixincs  //  rotateY(0de = g)      
     document.getElementById(this.element).style.transform = "rotateX(75deg)";          
    }
    
    */
    
    this.moveCounter++;
    return 0;
  }   // END anime() 
  
  
  
       
  get timerClicks() {  return this.timerClicks;  }         
  
  
  
  ranImageAud(){                                                          ///  sets up what will happen when this image/sound played in BE
     if(this.waitingToPlay){      }  else {                
         this.ranCounter = Math.floor(Math.random() * this.elementArr.length);          
       
         // choose image
          var randomImg = gFile.getRandomFile(this.fileArray[0]+this.elementArr[this.ranCounter][1],  this.elementArr[this.ranCounter][2], gFilePrefix, gImageExtension)  ;        
          var oldImage = document.getElementById(this.elementArr[this.ranCounter][0]).nativeElement.src; 
          oldImage = oldImage.slice(-10);  
          var newImage = randomImg.slice(-10);                         
       
       if (oldImage == newImage) {        } else{         ///diff image so swap, the same image gaps give a nice bit of space in rhythm sequence     
               
                // choose audio file
          this.randAud = gFile.getRandomFile(this.audArray[0], this.audArray[1],  gFilePrefix, gAudExtension );              
         
         this.element = this.elementArr[this.ranCounter][0];   ////  STILL USED a bit, BUT PHASE OUT SOON
         this.currElementArr =  structuredClone(this.elementArr[this.ranCounter]);    ////  arr of arr's like [ ["Top1", topPath, topFileNums, origProps obj], ...]             
       
           //  BREAKOUT
          switch (this.randAud) {           // is this a breakout file?     
            case this.specialArray[0][0]:  /// sd files
            case this.specialArray[0][1]: 
            case this.specialArray[1][0]:    /// sn + chord            
                if(gFile.getLoc(this.currElementArr[0], "left") < 500){
               ////  MAKE SOME OTHER SOUND,   nothing to breakout             
               var newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "01");
               this.randAud = newfile;
                }  else {
              this.currElementArr[4].breakMove = "breakOut"; ////  later, send this element off to the left somewhere           
              }
              break;                            
            
            case this.specialArray[1][2]:    ///  the loud snare sd    ///    for 'OPENUP' rn  
            if(this.brokeoutElsArr.length > 1){     ///   we got the right sound, & enough images over to left  ///  working here, change back to 4 ************************
              if(gOpenedUp == 0){   /// can only do this once                         
                gDoingOpen = 1;
              }  else {          ////  MAKE SOME OTHER SOUND,   have done the openup       
               var newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "00");
               this.randAud = newfile                 
               }           
            }  else{        ////  MAKE SOME OTHER SOUND,   too early to openup       
               var newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "00");
               this.randAud = newfile
            }
              break;  
              
              
              
            case this.specialArray[1][1]:        /// sn + chord        this is a breakback sound      HAVE TO SHIFT AN ARR OFF THE brokeoutElsArr
              if (this.brokeoutElsArr.length >5) {  
                this.breakBackArr =  this.brokeoutElsArr.shift();           /// now have 2 arrs in action, the swap one & the breakback one                 
              }  else  {           ////  MAKE SOME OTHER SOUND,   nothing to breakback       
               var newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "00");
               this.randAud = newfile;          
              } 
              break;
              
            default:    
              break;          }    ////    END switch (this.randAud)
         
                 
         
         gBeatEngine.action = [this.ranImageAudCB, this.currElementArr, randomImg, this];              
         gBeatEngine.playSound = this.randAud ; ///put setter there in Bengine
         this.waitingToPlay = 1;
            }   ////    END (oldImage == newImage)  ELSE
       
      
                                     
          this.ranCounter = 0; 
        }    ////  end  waitingToPlay ELSE           
  }          ////  end ranImageAud
  
  
  
                                                           ///  does the things fater ran image/sound played in BE
  ranImageAudCB(currElementArr, newImage, thisObj){     // currElementArr now  ["Top1", topPath, topFileNums, {top, left, width, height, opac}, {breakMove}]
     gFile.swapImage(currElementArr[0], newImage);      //  <-- main task of this callback 
             
         ////////    if it's a BREAKOUT sound
      if(currElementArr[4].breakMove =="breakOut"){        
        const currLeft = gFile.getLoc(currElementArr[0], "left");
        var pixInc = 0;
        var numMoves = 10;
        
        if(currLeft > 500) {    ////    move it over to vacant lot on left
          thisObj.brokeoutElsArr.push(currElementArr);                    
          switch(true) {
            case currLeft>900:             
              if(gOpenedUp){pixInc = 85; }  else {pixInc = 60;}
              break;
            case currLeft>700:            
               if(gOpenedUp){pixInc = 75; }  else {pixInc = 75;}
              break;            
            default:           
              pixInc = 51;    //20;
          }                                   
          var mover = new Animator([currElementArr], numMoves, pixInc, "left"); 
          gBeatEngine.animArray.push(mover); 
          
          ////    make big  
          var pixIncW;
          var pixIncH;
          numMoves = 20;
          if(gOpenedUp){            
            pixIncW = 6;    //20;   
            pixIncH = 9;
          }  else{
            pixIncW = 11;    //20;
            pixIncH = 16;    //20;
          }    ///  if(gOpenedUp)
          
            mover = new Animator([currElementArr], numMoves, pixIncW, "width"); 
            gBeatEngine.animArray.push(mover);                       
            mover = new Animator([currElementArr], numMoves, pixIncH, "height");          
            gBeatEngine.animArray.push(mover);              
            gFile.setFade (currElementArr[0], 0.9); 
            currElementArr[4].breakMove = 0;
          ////  end make big
          
          if(gOpenedUp){ }  else {      ////  make staatic randoms      ////////***********************************************************
            mover = new Animator([["BLleftOver02",  "BLACKleftOVERS/", 18]], 18, 0, "ranSwap");   //  <-- GLITCHER  
            gBeatEngine.animArray.push(mover);
          }          
          
        }      else {    ////  already moved over to left     
        }
      }    /// end if breakout
    
    
          /// if it's a BREAKBACK sd
      if(thisObj.breakBackArr){      
        document.getElementById(thisObj.breakBackArr[0]).style.zIndex = "2";
        var pixInc = 50;           
        var mover = new Animator([thisObj.breakBackArr], 10, pixInc, "right" );
        gBeatEngine.animArray.push(mover);  ///  move back to right    
        
         ////    make little                            
          var numMoves = 20;
          pixInc = -7;    //20;               
          mover = new Animator([thisObj.breakBackArr], numMoves, pixInc, "width"); 
          gBeatEngine.animArray.push(mover);         
          pixInc = -10;    //20;                
          mover = new Animator([thisObj.breakBackArr], numMoves, pixInc, "height", 0, 0, [thisObj.breakBackCB, thisObj.breakBackArr[0],  thisObj.breakBackArr[3] ]); 
          gBeatEngine.animArray.push(mover);                                                  //  adding a CB ^ to get back to exact old props after breakback                          
        
        if(gOpenedUp){ }  else {      ////  make glitch randoms      
            mover = new Animator([["BLleftOver02",  "BLACKleftOVERS/", 18]], 12, 0, "ranSwap"); 
            gBeatEngine.animArray.push(mover);
          }        
        
        thisObj.breakBackArr = 0;              
      }    /// end if BREAKBACK 
          
    
    
    
    ///   if it's the 'open right side' sd   ///  OPENING
    if(gDoingOpen){
      ////    make left anim squares littler             
      thisObj.brokeoutElsArr.forEach(item => {                                
          gBeatEngine.animArray.push(new Animator([item], 15, -12, "width"));           
          var elStyle = window.getComputedStyle(document.getElementById(item[0]));                                    
          if(Number(elStyle.getPropertyValue("left").replace("px", "")) > 150){                      
            gBeatEngine.animArray.push(new Animator([item], 20, 10, "left")); 
          }
      }); ///  end littler                  
      
      /// timing: snare sd first [done] / GLITCHER with breakout sds /  then nother snare crack / fade Bella & cover /  will need a CB /    loop last  --  
      
          gBeatEngine.animArray.push(new Animator([["BLleftOver02",  "BLACKleftOVERS/", 18]], 18, 0, "ranSwap", 0, 0, [thisObj.openupCB, 0, 0]));  //  <-- GLITCHER
                                                                  /// AUD AT 8, LIKE: [gFolderBase + "AUDIO/Brushs/", 61 ]
          var glitchSd = new Audio(gFolderBase + "AUDIO/Brushs/59.ogg" );                         
          glitchSd.volume= .9;
          glitchSd.play();
      
          var snSd = new Audio(gFolderBase + "AUDIO/Brushs/56.ogg" );                         
          snSd.volume= .9;
          snSd.play();
       
    }    ///   end open sequence                   

    
    
    
      ///  MOVE / ROTATE
    var checkLeft = gFile.getLoc(currElementArr[0], "left");
    var rot = 0;
    var moveFade = 0;  
    if(checkLeft<500) { moveFade = 1;  
                      } else {
      if(gFile.getRandomNum(200)<10){  if(gOpenedUp){rot = 1;} }    
      if(gFile.getRandomNum(50)<10){ moveFade = 1;  }
    }
    
    if(rot){            ////      rotate Y
       let transF = "rotateY(0deg)";
       document.getElementById(currElementArr[0]).style.transform = transF;      
      var degrees;  
      if(gFile.getRandomNum(20)<10){ degrees = (-20);} else {degrees = 20;}  
      //   console.log("call fr ranCB 7");
       let rotator = new Animator([currElementArr], 9, degrees, "Y");  // 
       gBeatEngine.animArray.push(rotator);  }                     
    
    if(moveFade){           ////  MOVE & FADE                    
         var pixInc = 2;  
         var directArr = ["left", "right", "up", "down"];
         var ranCounter = Math.floor(Math.random() * directArr.length);      
         var direction = directArr[ranCounter];              
         gBeatEngine.animArray.push(new Animator([currElementArr], 4, pixInc, direction));              
        
          var fadeInc = 0.1;    
      //   console.log("call fr ranCB 9");
          let fader = new Animator([currElementArr], 12, fadeInc, "fadeUpDown"); 
          gBeatEngine.animArray.push(fader);      
            }       
    
    ////  SHUFFLEz
    if(gFile.getRandomNum(50)<20){
      if(thisObj.brokeoutElsArr.length>1){ thisObj.brokeoutElsArr.forEach(item => document.getElementById(item[0]).style.zIndex = String(gFile.getRandomNum(50) + 50) );   }
    }    
    thisObj.waitingToPlay = 0;         
    
  }               ////  end ranImageAudCB
  
  
  
  
  
  breakBackCB(elementName, elOrigPropsObj)  {  gFile.setElProps(elementName, elOrigPropsObj);  }
  
  openupCB(){     
//      var snSd = new Audio(gFolderBase + "AUDIO/Brushs/56.ogg" );               ///  this one interferes with loopaud          
  //    snSd.volume= .9;
    //  snSd.play();
    
    // fade out cover, fade in Bella    
      gBeatEngine.animArray.push(new Animator([["BLleftOver02"]], 9, -.1, "F"));         
      gBeatEngine.animArray.push(new Animator([["BELLA_NEW"]], 8, .1, "F"));       
  
      gDoingOpen = 0;
      gOpenedUp = 1;    /// check later, can DoingOpen double up?
      gBeatEngine.playingLoop = 0;   ///  signal to start loop on next play beat      
  }
    
   
  
}  //END Animator CLASS



