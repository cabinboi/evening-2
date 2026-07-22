///

class Animator {  
  millsecTimer = 40; //ms = 25 frames/sec
  timeout = 0; 
  
  brokeoutElsArr = [];  /// holds the elements waiting for breakback
  breakBackArr = 0;      ///  the one arr being broke back to start pos
  elementArr = [];          /// big long thing with every onscreen moving element
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
  specialArray = [];  ///used now as [moveOutAudArr, moveBackAudArr]  for breakout [gFolderBase + "AUDIO/Brushs/58.ogg", gFolderBase + "AUDIO/Brushs/60.ogg"]
  volMultiple = .1;
  
  
  ranCounter=0; /// use for anything, then zero
            
  constructor(elmntArr, numMovements, increments, whatMotion, files, sequence, callBack, audList, millsecs, specArr  ) {
 //   console.log("in an constr elArr: " + elmntArr);                                              //  specArr ^^, is xtra aud files in ranIA 
    if (elmntArr) {this.elementArr = elmntArr;   }          ////  arr of arr's like [ ["Top1", topPath, topFileNums, propsObj], ...]
              ////  need to add the origPropsObj to each array here
    if (numMovements) {this.numMoves = numMovements;}
    if (increments) {this.pixincs = increments;}
    if (whatMotion) {this.motion = whatMotion;}
    if (files) {this.fileArray = files;  }
    if (sequence) {this.sequencer = sequence;   }
    if (callBack) {   this.callBack = callBack;   }   
    if (audList) {    this.audArray = audList;    }    ////  [aud files path, num in folder, volume multiple]
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
        
      case "ranImageAud":            // ranImageAud is coded to process the big full this.elementArr, all the other motions take one nested array only
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
        break;      ///  left right up down     
        
        
      case "fadeUpDown": 
        this.element = this.elementArr[0][0];      
        if(this.moveCounter <= this.numMoves/2){           
          gFile.setFade(this.element, this.pixincs);
        } else {          
          gFile.setFade(this.element, this.pixincs * -1);
        }    
        break;          ///  fade up down
        
        
        case "F":     // one way fader
           this.element = this.elementArr[0][0]; 
           gFile.setFade(this.element, this.pixincs);
        break;     ///  fade one way
        
           
      case "width":      //    resize(element, widthHeight, addition=20)
      case "height":            
        this.element = this.elementArr[0][0];      
        gFile.resize(this.element, this.motion, this.pixincs);               
        break;     ///  width height
                 
        
      case "ranSwapGrid":         //  trying bug fix this, if's not workiing                                     
            if(gFile.getRandomNum(500)<5){   
              let randomImg = gFile.getRandomFile(gFolderBase + this.elementArr[0][1],  this.elementArr[0][2], gFilePrefix, gImageExtension)  ;  
              gFile.swapImage(this.elementArr[0][0], randomImg);       }                          
          break;     ///  ranswap
        
      case "ranSwap":         //  this motion relies on only one element array coming in, not a big array like ranImageAud            
                        //  no integer sent, swap image every beat            
            let randomImg = gFile.getRandomFile(gFolderBase + this.elementArr[0][1],  this.elementArr[0][2], gFilePrefix, gImageExtension)  ;  
            gFile.swapImage(this.elementArr[0][0], randomImg);                                   
          break;     ///  ranswap
        
        
        
        
        
      case "Y":         //    rotate Y                     
        this.element = this.elementArr[0][0];   
        //parse out the integers and add to this.pixincs  //  rotateY(0deg)     
        let oldStr = document.getElementById(this.element).style.transform;          
       // let oldStr = window.getComputedStyle(document.getElementById(this.element)).style.transform;
       // console.log(" in Y oldstr: " +  oldStr);
        let oldArr = oldStr.split("(");
        let oldArr2 = oldArr[1].split("d");
        let oldInt = parseInt(oldArr2[0]);
        let newInt = oldInt+this.pixincs;
        let newStr = String(newInt);
        let tranString = "rotateY(" + newStr + "deg)" ;                 
       document.getElementById(this.element).style.transform = tranString;    
          break;     ///  rotate Y
        
      default:
    }
              
    
  
    
    this.moveCounter++;
    return 0;
  }   // END anime() 
  
  
  
       
  get timerClicks() {  return this.timerClicks;  }         
  
  
  
  ranImageAud(){                                                          ///  sets up what will happen when this image/sound played in BE
     if(this.waitingToPlay){      }  else {                
         this.ranCounter = Math.floor(Math.random() * this.elementArr.length);          
       
         // choose image
          let randomImg = gFile.getRandomFile(this.fileArray[0]+this.elementArr[this.ranCounter][1],  this.elementArr[this.ranCounter][2], gFilePrefix, gImageExtension)  ;        
          let oldImage = document.getElementById(this.elementArr[this.ranCounter][0]).nativeElement.src; 
          oldImage = oldImage.slice(-10);  
          let newImage = randomImg.slice(-10);                         
       
       if (oldImage == newImage) {        } else{         ///diff image so swap, the same image gaps give a nice bit of space in rhythm sequence     
               
                // choose audio file
         this.randAud = gFile.getRandomFile(this.audArray[0], this.audArray[1],  gFilePrefix, gAudExtension );              
         
         this.element = this.elementArr[this.ranCounter][0];   ////  STILL USED a bit, BUT PHASE OUT SOON  // don't think used now in ranImageAud
         this.currElementArr =  structuredClone(this.elementArr[this.ranCounter]);    ////  arr of arr's like [ ["Top1", topPath, topFileNums, origProps obj], ...]                    
                                   
 //  MODE  SECTION    -- 
          if(gOpenedUp){ if(gMode3){ this.ranIAmode3() } else {this.ranIAmode2() } }   else  { this.ranIAmode1() };          
         //  -------------------------------------- mode code removed from here                                              
///  END MODE  SECTION    --                           
         
         gBeatEngine.action = [this.ranImageAudCB, this.currElementArr, randomImg, this];              
         gBeatEngine.playSound = [this.randAud, this.volMultiple ]; ///  [randaud, vol multiple]    ///put setter there in Bengine
         this.waitingToPlay = 1;
            }   ////    END (oldImage == newImage)  ELSE             
                                     
          this.ranCounter = 0; 
        }    ////  end  waitingToPlay ELSE           
  }          ////  end ranImageAud
  
  
  
  
  ranIAmode1(){
   /// console.log("RIAmode1 gOpenedUp " + gOpenedUp);  //  gOpenedUp==0    
    this.volMultiple = this.audArray[2];    //sound vol, will make a bit louder for the break sds         

    switch (this.randAud) {           // is this a breakout file?                  
        ///  BREAKOUT FILE
      case this.specialArray[0][0]:  /// sd files
      case this.specialArray[0][1]: 
      case this.specialArray[1][0]:    /// sn + chord            
          if(gFile.getLoc(this.currElementArr[0], "left") < 500){
         ////  MAKE SOME OTHER SOUND,   this el alrady brokeout             
         let newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "01");
         this.randAud = newfile;
         this.recurseMode(1);    ///  because of the new file
          }  else {
        this.currElementArr[5].breakMove = "breakOut"; ////  later, send this element off to the left somewhere               
        }
        break;                                          

      ///  OPENUP FILE
      case this.specialArray[1][2]:    ///  the loud snare sd    ///    for 'OPENUP' rn  
      if(this.brokeoutElsArr.length > 2){     ///   we got the right sound, & enough images over to left               was 4             
          gDoingOpen = 1;  /// can only do this once                     
      }  else{        ////  MAKE SOME OTHER SOUND,   too early to openup       
         let newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "00");
         this.randAud = newfile        
         this.recurseMode(1);    ///  because of the new file
      }
        break;                

        ///  BREAKBACK FILE
      case this.specialArray[1][1]:        /// sn + chord        this is a breakback sound      HAVE TO SHIFT AN ARR OFF THE brokeoutElsArr
        if (this.brokeoutElsArr.length >4) {  
          this.breakBackArr =  this.brokeoutElsArr.shift();           /// now have 2 arrs in action, the swap one & the breakback one                     
        }  else  {           ////  MAKE SOME OTHER SOUND,   nothing to breakback       
         let newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "00");
         this.randAud = newfile;                    
         this.recurseMode(1);    ///  because of the new file
        } 
        break;

      default:    
        break;          }    ////    END switch (this.randAud)
  }  ///  end ranIAmode1
  
  
  
  ranIAmode2(){            
    //console.log("mode2 test: " );
      this.volMultiple = this.audArray[2];    //sound vol, will make a bit louder for the break sds                      

      if(gSectionNums == 3){      /// USE THIS SWITCH, WANT TO GET TO NO BROKEOUTS SOONER    ///  does this need go in an else now?  **************
        
          ///  SORT THE 2 SWITCHES, THEN TEST,  THEN TAKE A NEW VERSION UP TO GITHUB
        if(this.brokeoutElsArr.length == 0){     ///   no images over to left           /// soon we'll head off to alley section                                        
            gDoingM3 = 1;                 }        
        
        switch (this.randAud) {                                  
            ///  OPENUP FILE  -- this time no use for it      ///     CHANGE POS OF THIS IN OTHER MODES ??
          case this.specialArray[1][2]:    ///  the loud snare sd     ////  MAKE SOME OTHER SOUND,   not needed here       
             let newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "00");
             this.randAud = newfile                             
             this.recurseMode(2);    ///  because of the new file  ranIAmode2()  //  can do a recursive call to ranIAmode2()??  ///  maybe this, (would have to use in every place):
             break;   

            ///  BREAKOUT FILE
          case this.specialArray[0][0]:  /// sd files
         // case this.specialArray[0][1]: 
         // case this.specialArray[1][0]:    /// sn + chord            ////  dropped 1 from here to get more breakbacks, hope to have empty brokeout array at some point
              if(gFile.getLoc(this.currElementArr[0], "left") < 500){     ////  MAKE SOME OTHER SOUND,   this el alrady brokeout                     
               let newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "01");
               this.randAud = newfile;
               this.recurseMode(2);    ///  because of the new file 
              }  else {
                this.currElementArr[5].breakMove = "breakOut"; ////  later, send this element off to the left somewhere    
                this.volMultiple = this.audArray[2] + .3;      
                
                      }
            break;                                                               

            ///  BREAKBACK FILE
          case this.specialArray[0][1]: 
          case this.specialArray[1][0]:    /// sn + chord     /// just added these from breakouts
          case this.specialArray[1][1]:        /// sn + chord        this is a breakback sound      HAVE TO SHIFT AN ARR OFF THE brokeoutElsArr
            if (this.brokeoutElsArr.length >0) {              ////    was >2
              this.breakBackArr =  this.brokeoutElsArr.shift();           /// now have 2 arrs in action, the swap one & the breakback one                        
            }  else  {           ////  MAKE SOME OTHER SOUND,   nothing to breakback       
             let newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "00");
             this.randAud = newfile;   
             this.recurseMode(2);    ///  because of the new file 
            } 
             //// TO DO -->  ADD A SECOND ONE IN MODE2, TO SPEED UP THE TAKEAWAYS. IF BROKEOUTARRAY > 3?  TAKE TWO BACK IN
            break;

          default:    
            break;         
            }    ////    END switch (this.randAud)    ///    in main if
      }        ///      END  if(gSectionNums == 3)

      else {    /// USE THIS SWITCH, use a more even breakouts thing, we're playing Mode 2 forever, only 2 Modes
          switch (this.randAud) {                                  
            ///  OPENUP FILE  -- this time no use for it      ///     CHANGE POS OF THIS IN OTHER MODES ??
          case this.specialArray[1][2]:    ///  the loud snare sd     ////  MAKE SOME OTHER SOUND,   not needed here       
             let newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "00");
             this.randAud = newfile   
             this.recurseMode(2);    ///  because of the new file 
             break;                  

            ///  BREAKOUT FILE
          case this.specialArray[0][0]:  /// sd files
          case this.specialArray[0][1]: 
         // case this.specialArray[1][0]:    /// sn + chord            ////  droped 1 from here to get more breakbacks, hope to have empty brokeout array at some point
              if(gFile.getLoc(this.currElementArr[0], "left") < 500){
               ////  MAKE SOME OTHER SOUND,   this el alrady brokeout             
               let newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "01");
               this.randAud = newfile;
               this.recurseMode(2);    ///  because of the new file 
              }  else {
              this.currElementArr[5].breakMove = "breakOut"; ////  later, send this element off to the left somewhere 
                
               // console.log("mode2 trans before: " + document.getElementById(this.currElementArr[0]).style.translate);
                document.getElementById(this.currElementArr[0]).style.translate = "none";   //  moved up from CB, see if can get rid of orphans that cut thru overlay
            //    console.log("mode2 trans after: " + document.getElementById(this.currElementArr[0]).style.translate);
                
              this.volMultiple = this.audArray[2] + .3;           
            }
            break;                                                               

            ///  BREAKBACK FILE
         // case this.specialArray[0][1]: 
          case this.specialArray[1][0]:    /// sn + chord     /// just added these from breakouts
          case this.specialArray[1][1]:        /// sn + chord        this is a breakback sound      HAVE TO SHIFT AN ARR OFF THE brokeoutElsArr
            if (this.brokeoutElsArr.length >0) {              ////    was >2
              this.breakBackArr =  this.brokeoutElsArr.shift();           /// now have 2 arrs in action, the swap one & the breakback one                        
            }  else  {           ////  MAKE SOME OTHER SOUND,   nothing to breakback       
             let newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "00");
             this.randAud = newfile;     
             this.recurseMode(2);    ///  because of the new file 
            } 
             //// TO DO -->  ADD A SECOND ONE IN MODE2, TO SPEED UP THE TAKEAWAYS. IF BROKEOUTARRAY > 3?  TAKE TWO BACK IN
            break;

          default:    
            break;         
            }    ////    END switch (this.randAud)  ///  in else sect
      }      ///      END  if(gSectionNums == 3)   else{}           
  }  //  end ranIAmode2
  
  
  recurseMode(whichMode){    ///  because of the new sound file        
    switch(whichMode) {
      case 1:
       // console.log("inside recurseMode(case 1) whichMode " +whichMode);
        this.ranIAmode1();
        break;
      
      case 2:
      //  console.log("inside recurseMode(case 2) whichMode " +whichMode);
        this.ranIAmode2();
        break;
        
      case 3:
       // console.log("inside recurseMode(case 3) whichMode " +whichMode);
        this.ranIAmode3();
        break;
        
      default:
        break;        
    }         
  }   
  
   
  
  ranIAmode3(){           ///  nah make this the alley section         ///  was  --> build a ghost copy of Bella over on left    
    //  console.log("RIAmode3 gOpenedUp gMode3 " + gOpenedUp + gMode3);
    this.volMultiple = this.audArray[2];    //sound vol, will make a bit louder for the break sds         

   ///  IF (Mode 1 and Mode 3)
    switch (this.randAud) {           // is this a breakout file?                  
        ///  BREAKOUT FILE
      case this.specialArray[0][0]:  /// sd files
      case this.specialArray[0][1]: 
      case this.specialArray[1][0]:    /// sn + chord      
      case this.specialArray[1][1]:  
        ///  do something new with these sds
        
        
        /*    ///  old version here
          if(gFile.getLoc(this.currElementArr[0], "left") < 500){
         ////  MAKE SOME OTHER SOUND,   this el alrady brokeout             
         let newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "01");
         this.randAud = newfile;
          }  else {
        this.currElementArr[5].breakMove = "breakOut"; ////  later, send this element off to the left somewhere    
        if(gOpenedUp){this.volMultiple = this.audArray[2] + .3;}              
        }
        */
        
        break;                                          

      ///  OPENUP FILE
      case this.specialArray[1][2]:    ///  the loud snare sd    ///    for 'OPENUP' rn                  
          ///  do something new with these sds
        
        
        /*    ///  old version here
      if(this.brokeoutElsArr.length > 3){     ///   we got the right sound, & enough images over to left  
        if(gOpenedUp == 0){   /// can only do this once                         
          gDoingOpen = 1;
        }  else {          ////  MAKE SOME OTHER SOUND,   have done the openup       
         let newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "00");
         this.randAud = newfile                 
         }           
      }  else{        ////  MAKE SOME OTHER SOUND,   too early to openup       
         let newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "00");
         this.randAud = newfile
      }
        */
        
        break;                

        /*
        ///  BREAKBACK FILE
      case this.specialArray[1][1]:        /// sn + chord        this is a breakback sound      HAVE TO SHIFT AN ARR OFF THE brokeoutElsArr
        if (this.brokeoutElsArr.length >6) {  
          this.breakBackArr =  this.brokeoutElsArr.shift();           /// now have 2 arrs in action, the swap one & the breakback one 
           if(gOpenedUp){this.volMultiple = this.audArray[2] + .3;}             
        }  else  {           ////  MAKE SOME OTHER SOUND,   nothing to breakback       
         var newfile = this.randAud.replace(this.randAud.substring(this.randAud.length-6, this.randAud.length-4), "00");
         this.randAud = newfile;          
        } 
        break;
*/
      default:    
        break;          }    ////    END switch (this.randAud)
  }  //  end ranIAmode3
  
  
  
                                                           ///  does the things after ran image/sound played in BE
  ranImageAudCB(currElementArr, newImage, thisObj){     // currElementArr now  ["Top1", topPath, topFileNums, {top, left, width, height, opac}, {breakMove}]
    
      if(gMode3){  
    // if this el's src is not the orig image, swap to orig image, like breakBackCB does, else, use newImage || 
        let currImage = document.getElementById(currElementArr[0]).nativeElement.src;
        let origImage = gFolderBase +currElementArr[1]+ currElementArr[3] +".png";
        if(currImage == origImage){  ///  that's ok, can change it once, keep newImage
                  }  else {  newImage =  origImage }        
                      //  fade out gBackElement_2 Bella so see Alley                     
      document.getElementById(gBackElement_1).style.opacity =  "1";
    // temp  gBeatEngine.animArray.push(new Animator([[gBackElement_2]], 8, -.05, "F"));                
      gBeatEngine.animArray.push(new Animator([[gLeftCover]], 10, -.1, "F"));   
  }    
    
     gFile.swapImage(currElementArr[0], newImage);      //  <-- main task of this callback !!!!!!!!!!!!!!!!!!!  *****************    
             
         ////////    if it's a BREAKOUT sound      ***********  NEED TO ADD MODES
      if(currElementArr[5].breakMove =="breakOut"){        
        const currLeft = gFile.getLoc(currElementArr[0], "left");
        let pixInc = 0;
        let numMoves = 10;        
        
        if(currLeft > 500) {    ////    move it over to vacant lot on left
          thisObj.brokeoutElsArr.push(currElementArr);  
          
          if(gMode3){
            //  pixInc = 50;            
          }  else{        ///    diff pixIncs for abstract bit on left
              switch(true) {
                case currLeft>900:             
                 // if(gOpenedUp){pixInc = 85; }  else {pixInc = 60;}
                  if(gOpenedUp){pixInc = gFile.getRandomNum(15) + 80; }  else {pixInc = gFile.getRandomNum(15) + 55;}
                  break;
                case currLeft>700:            
                   if(gOpenedUp){pixInc = gFile.getRandomNum(15) + 70; }  else {pixInc = gFile.getRandomNum(15) + 45;}  //  <---  WAS 75, 75
                  break;            
                default:           
                  pixInc = gFile.getRandomNum(15) + 35;    //20;
              }       
            
            
            
            //  testing
           // let oldtrans = document.getElementById(currElementArr[0]).style.transform;
            document.getElementById(currElementArr[0]).style.zIndex = "7";     ///    new jun 28    ADD  transform:"translateY(0px)"  .style.transform = `translate
           // document.getElementById(currElementArr[0]).style.translate = "none";   //   moved to top ^^^
          //  let newtrans = document.getElementById(currElementArr[0]).style.transform;
            //console.log("in ranImageAudCB oldtrans newtrans " + oldtrans +" " + newtrans);  //  in ranImageAudCB oldtrans newtrans rotateY(-200deg)none
            
            
            
            let mover = new Animator([currElementArr], numMoves, pixInc, "left", 0, 0, [thisObj.breakOutCB, currElementArr[0]]);         
             gBeatEngine.animArray.push(mover); 
          }  /// end gMode3 else                         
          
           if(gMode3){                       ///  no make big, building ghost Bella instead, on the alley
          }  else{            ////    make big  
            let pixIncW;
            let pixIncH;
            numMoves = 20;
            if(gOpenedUp){            
              pixIncW = 6;    //20;   
              pixIncH = 9;
            }  else{
              pixIncW = 11;    //20;
              pixIncH = 16;    //20;
            }    ///  if(gOpenedUp)

              let mover = new Animator([currElementArr], numMoves, pixIncW, "width"); 
              gBeatEngine.animArray.push(mover);                       
              mover = new Animator([currElementArr], numMoves, pixIncH, "height");          
              gBeatEngine.animArray.push(mover);              
              gFile.setFade (currElementArr[0], 0.7); 
              currElementArr[5].breakMove = 0;
          } ////  end make big                                        
          
          if(gOpenedUp){ }  else {      ////  make static randoms     
           let mover = new Animator([[gRightCover,  "BLACKleftOVERS/", 23]], 18, 0, "ranSwap");   //  <-- GLITCHER  will need a glitch CB, so ends on opaque one
            gBeatEngine.animArray.push(mover);
          }          
          
        }  ///  end if currrLeft >500      
        
        else {  }    ////  already moved over to left     
      
      }    /// end if breakout
    
        
    
          /// if it's a BREAKBACK sd     ***********  NEED TO ADD MODES
      if(thisObj.breakBackArr){      
        document.getElementById(thisObj.breakBackArr[0]).style.zIndex = "7";
        let pixInc = 50;           
        let mover = new Animator([thisObj.breakBackArr], 10, pixInc, "right" );
        gBeatEngine.animArray.push(mover);  ///  move back to right    
        //// TO DO -->  if using Mode 3, ADD A SECOND ONE IN MODE2, TO SPEED UP THE TAKEAWAYS. IF BROKEOUTARRAY > 3?  TAKE TWO BACK IN
        
        
       if(gMode3){                     
        }  else{
         ////    make little                            
          let numMoves = 20;
          pixInc = -7;    //20;               
          mover = new Animator([thisObj.breakBackArr], numMoves, pixInc, "width"); 
          gBeatEngine.animArray.push(mover);         
          pixInc = -10;    //20;                
          mover = new Animator([thisObj.breakBackArr], numMoves, pixInc, "height", 0, 0, [thisObj.breakBackCB, thisObj.breakBackArr[0],  thisObj.breakBackArr[4] ]); ///  was [5]
          gBeatEngine.animArray.push(mover);                                                  //  adding a CB ^ to get back to exact old props after breakback                          
        }
        
        
        if(gOpenedUp){ }  else {      ////  make glitch randoms      
            mover = new Animator([[gRightCover,  "BLACKleftOVERS/", 23]], 12, 0, "ranSwap");   //  <-- GLITCHER   will need a glitch CB, so ends on opaque one
            gBeatEngine.animArray.push(mover);
          }        
        
        thisObj.breakBackArr = 0;              
      }    /// end if BREAKBACK 
          
    
    
    
    ///   if it's the 'open right side' sd   ///  OPENING from Mode1 to Mode2
    if(gDoingOpen){
      ////    make left anim squares littler             
      thisObj.brokeoutElsArr.forEach(item => {                                
          gBeatEngine.animArray.push(new Animator([item], 12, -9, "width"));         //  was 10, -9  
          let elStyle = window.getComputedStyle(document.getElementById(item[0]));                                    
          if(Number(elStyle.getPropertyValue("left").replace("px", "")) > 150){                      
            gBeatEngine.animArray.push(new Animator([item], 12, 15, "left")); //  <----   WAS 10, 15
          }
      }); ///  end littler                         
      
      /// timing: snare sd first [done] / GLITCHER with breakout sds /  then nother snare crack / fade Bella & cover /  will need a CB /    loop last  --        
          gBeatEngine.animArray.push(new Animator([[gRightCover,  "BLACKleftOVERS/", 23]], 18, 0, "ranSwap", 0, 0, [thisObj.openupCB, 0, 0]));  //  <-- GLITCHER
                                                                  /// AUD AT 8, LIKE: [gFolderBase + "AUDIO/Brushs/", 61 ]           
          
          document.getElementById(gGridFloat).style.width = "570px";
    }    ///   end open sequence        
    
    
    
  ///   if it's the 'open right side' sd   ///  but now going from Mode2 to Mode3  // BUT NOW MAKING EMPTY LEFT THE TRIGGER
    if(gDoingM3){
      ////    make left anim squares littler          ///  should be nothing on left side, so what to do here?   
      gDoingM3 = 0;                  
      gMode3 = 1; //  temp comment out
    }    ///   end going to mode3 sequence  

    
    
    
      ///  MOVE / ROTATE
    let checkLeft = gFile.getLoc(currElementArr[0], "left");
    let rot = 0;
    let moveFade = 0;  
    if(checkLeft<500) { moveFade = 1;  
                      } else {
      if(gFile.getRandomNum(200)<10){  if(gOpenedUp){rot = 1;} }    
      if(gFile.getRandomNum(50)<10){ moveFade = 1;  }
    }
    
    if(rot){            ////      rotate Y
       let transF = "rotateY(0deg)";
       document.getElementById(currElementArr[0]).style.transform = transF;      
      let degrees = 0;  
      if(gFile.getRandomNum(20)<10){ degrees = (-20);} else {degrees = 20;}  
      //   console.log("call fr ranCB 7");
       let rotator = new Animator([currElementArr], 9, degrees, "Y"); 
  
       gBeatEngine.animArray.push(rotator);  }                     
    
    if(moveFade){           ////  MOVE & FADE                    
         let pixInc = 2;  
         if(gMode3){ pixInc = 1;  }
         let directArr = ["left", "right", "up", "down"];
         let ranCounter = Math.floor(Math.random() * directArr.length);      
         let direction = directArr[ranCounter];              
         gBeatEngine.animArray.push(new Animator([currElementArr], 4, pixInc, direction));              
        
          let fadeInc = 0.1;    
      //   console.log("call fr ranCB 9");
          let fader = new Animator([currElementArr], 12, fadeInc, "fadeUpDown"); 
          gBeatEngine.animArray.push(fader);      
            }       
    
    ////  SHUFFLEz
    if(gFile.getRandomNum(50)<20){
      if(thisObj.brokeoutElsArr.length>1){ 
        thisObj.brokeoutElsArr.forEach(item => document.getElementById(item[0]).style.zIndex = String(gFile.getRandomNum(50) + 60) );  
      }
    }    //// end  SHUFFLEz
    
    
    thisObj.waitingToPlay = 0;         
    
  }               ////  end ranImageAudCB
  
  
  
  
  breakOutCB(elementName)  {     
    if(gFile.getLoc(elementName, "left")<0){
       console.log("in  breakOutCB if(), ");
     gFile.setLoc(elementName, "left", 0);
    } 
                           
                           }
  breakBackCB(elementName, elOrigPropsObj)  {  gFile.setElProps(elementName, elOrigPropsObj);  }
  
  openupCB(){     
//      let snSd = new Audio(gFolderBase + "AUDIO/Brushs/56.ogg" );               ///  this one interferes with loopaud          
  //    snSd.volume= .9;
    //  snSd.play();        
    
    // fade out cover, fade in Bella    
      gBeatEngine.animArray.push(new Animator([[gRightCover]], 9, -.1, "F"));                      
      gBeatEngine.animArray.push(new Animator([[gBackElement_2]], 9, .1, "F"));       
     // gBeatEngine.animArray.push(new Animator([[gBackElement_2]], 16, .1, "fadeUpDown"));       //  "fadeUpDown"       
      
     // document.getElementById(gBackElement_2).style.transform = "rotateY(-30deg)"; 
      //gBeatEngine.animArray.push(new Animator([[gBackElement_2]], 6, -5, "Y"));  ///  *******************************      
      
  
      gDoingOpen = 0;
      gOpenedUp = 1;    /// check later, can DoingOpen double up?
      gBeatEngine.playingLoop = 0;   ///  signal to start loop on next play beat      
  }
    
  
  doMode3CB(){         //  NOT GETTING HERE NOW      
    console.log("domode3CB shouldn't get here ??")
      gDoingM3 = 0;
      gMode3 = 1;    
         
  }
  
  
    rotateCB(el){console.log("rotateCB trans after rotateY(): " + document.getElementById(el).style.translate);}  // 
   
  
}  //END Animator CLASS           gwd.actions.timeline.gotoAndPlay('page1', 'bellaDrop');  ////  go to  bella on cobbles   document.getElementById(gBackElement_2).style.opacity = "1";   




//  if( (Math.floor(Math.random() * this.specialArray[0]) > (this.specialArray[0] * .85)) ){    //  if random > fraction of the number we got given
  
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


 /* var glitchSd = new Audio(gFolderBase + "AUDIO/Brushs/59.ogg" );                         
          glitchSd.volume= .9;
          glitchSd.play();  */
      
//          var snSd = new Audio(gFolderBase + "AUDIO/Brushs/56.ogg" );                         
  //        snSd.volume= .9;
    //      snSd.play();
