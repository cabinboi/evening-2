
class Beatengine {    
  
  ////TEST BACK LOOP
  playingLoop = 1;  //  0;    ///    ***********************************************************
  loopAud = 0;
  ///
  
  barsInSect = 16;
  repeatSection = true;
  
  barCount = 1;
  beatCount = 1;
  count32s = 1;
  
  timeSig = [4,4];  
  tempo = 83; //  60,000/BPM = milliseconds /8 =32nds  
  millsecTimer=40; // 25 f/s
  
  ////testing 8th note triplets
  tripletTempo = 222;
  
  startTime = 0; 
  rightTime = 0;
  now = 0;
  beatTimeout = 0;
  
  playSound = 0; 
  currentAud = 0;
  currAuxAud = 0;
  randAud = 0;
  audArray = [];
  audCounter = 2; //using audios 2-6 for the random instrument files
  aud1ended = 1;  //pair
  aud1toplay =0;  //pair  
  
  action = 0;    // ***being set outside  ...FIX THIS WITH A SETTER
  currentAction = 0;
  isSameImg = 0;
  
  animArray = [];
  spareCounter=0;
  
  constructor(bars, tSig, BPM, audfiles, millsecs) {    
    if (bars) {this.barsInSect = bars[0]; this.repeatSection = bars[1]; }
    if (tSig) {this.timeSig = tSig;  }
    if (BPM) {
      this.tempo = (60000/BPM)/8;  
      this.tripletTempo = (60000/BPM)/3;
    } 
    if (audfiles) {
      this.audArray[0] = new Audio(audfiles[0]);   ///test bass drum
     // this.audArray[0].volume= gVolume * 0.4;
   //   this.audArray[1] = new Audio(audfiles[1]);    ///test Marim2s
   //   this.audArray[1].volume= gVolume * 0.2;
      
      this.audArray[1] = new Audio(audfiles[1]);      ///test snare   
     // this.audArray[2] = new Audio(gFolderBase + "AUDIO/Brushs/26" +gAudExtension);
     // this.audArray[2].src = gFolderBase + "AUDIO/Brushs/26" +gAudExtension;
   //   this.audArray[2].volume= gVolume * 0.9;
      
      this.audArray[2] = new Audio(audfiles[3]);    //// rest are brushes
      //adding more channels to stop conflicts 
      this.audArray[3] = new Audio(audfiles[3]);
      this.audArray[4] = new Audio(audfiles[3]);   
      this.audArray[5] = new Audio(audfiles[3]);   
      this.audArray[6] = new Audio(audfiles[3]);  
    }   
    if (millsecs) {this.millsecTimer = millsecs;  }  
  }   
  
   rollIt (){  //coming thru every 40 ms          
   this.rightTime = this.startTime + this.tempo; 
   let inLastCycle = this.rightTime - this.millsecTimer; // time to quit the timeouts     
   this.now = new Date().getTime();             
     
   if(this.now < inLastCycle ){     
      //no beat yet, but check for something to animate   ::::  these are constant running animations    
     let anim = 0;
    for (var x = 0; x < this.animArray.length; x++){      
      if(this.animArray[x]){
           anim = this.animArray[x].anime();            ////animator's own action gets done here
            if (anim){              
              this.animArray[x]=0;
              }           }         }           
     this.beatTimeout = setTimeout(BeatEngineRollIt, this.millsecTimer);
     return 0;
   }//do another 40 ms               
     
     ///going forward now, run a few spare cycles until we can play a beat
     while (this.now < this.rightTime)  {
        this.now = new Date().getTime();              
      }         
      /// if this.now > inLastCycle & pretty close to rightTime, we get to here and play drummies                
     this.currentAud = 0;
     this.currAuxAud = 0;
     this.currentAction = 0;  
     this.isSameImg = 0;   
     
     
            switch (this.count32s) {     
             case 1:               /// ON BEAT  
                    
                
                  ///////////  TEST THE BACKGROUND LOOP   
                    if(this.playingLoop){}     else {
                      this.loopAud = new Audio(gFolderBase + "AUDIO/shuffle_loop.ogg" );
                     // console.log("this.playingLoop     " + this.playingLoop );                 
                      this.loopAud.volume= .1;
                       this.loopAud.loop=true;
                      this.loopAud.play();
                      this.playingLoop = 1;
                     // console.log("this.playingLoop     " + this.playingLoop );
                    }
                    
                
                
                
                ////test how to trigger an 8th note triplet from here
                //// and not play case 8 while triplet on
                
                if (this.playSound){                              
                  
                switch (this.beatCount) {
                     case 1:                                                    
               //     this.audArray[0].currentTime = 0;       /////  BASS DRUM
                //    this.audArray[0].volume= gVolume * 0.2;
                //    this.currentAud = this.audArray[0]
                   // if (this.action){ this.currentAction = this.action; }  ////    ::::  these are animations tied to the timing beats   BREAKOUT WORK
                    break;
                    
                    case 2:      
                   /* this.audArray[1].currentTime = 0;          /////  SNARE  DRUM
                    this.audArray[1].volume= gVolume * 0.6;                   
                    this.currentAud = this.audArray[1]
                    if (this.action){ this.currentAction = this.action; }  ////    ::::  these are animations tied to the timing beats */
                    break;
                    
                     case 3:                                                        
               /*     this.audArray[0].currentTime = 0;       /////  BASS DRUM
                    this.audArray[0].volume= gVolume * 0.2;
                    this.currentAud = this.audArray[0]  */
                //    if (this.action){ this.currentAction = this.action; }  ////    ::::  these are animations tied to the timing beats  BREAKOUT WORK
                    break;
                    
                    case 4:            
              /*      this.audArray[1].currentTime = 0;             /////  SNARE  DRUM
                    this.audArray[1].volume= gVolume * 0.6;                   
                    this.currentAud = this.audArray[1]  */
                 //   if (this.action){ this.currentAction = this.action; }  ////    ::::  these are animations tied to the timing beats  BREAKOUT WORK
                    break;                                       
                    
                  default:                                         
                                       
                    }   /// switch (this.beatCount)                                                                 
                }      ////if playsound
                
                  
              //   if (this.action){ this.currentAction = this.action; }  ////    ::::  these are animations tied to the timing beats           BREAKOUT WORK           
              break;  
                
                
                
          case 2:                                  
              break;        
                
          case 3:                                 
              break;        
                          
          case 4:                         
              break;
                        
          case 5:          /// OFF BEAT  1 r *& r                                   
                /////////// testing          HAPPENING INDEPENDENT OF THE ANIMATIONS & THEIR TIED BEATS                
            /*    if (this.playSound){                                         
                 if (this.aud1ended){                                                       
                    if(this.beatCount == 1){   
                      if(gFile.getRandomNum(20)<3){
                        this.randAud = gFile.getRandomFile(gFolderBase + "AUDIO/MARIM 2s/", 11,  gFilePrefix, gAudExtension );  
                        this.audArray[1].src = this.randAud;
                        this.audArray[1].currentTime = 0;                         
                        this.aud1ended = 0;                   /////make a setter for this                                     
                        this.audArray[1].play();
                        this.audArray[1].onended = audEnded;                                             
                  }     }      }   }      */
                
                break;  
                              
          case 6:                         
              break;
                
          case 7:                               
              break;                      
                
          case 8:                ////brushes  ANIM's own sounds  MIGHT PUT THIS ON A DIFFERENT BEAT
                
                if ( gFile.getRandomNum(10) >4) {           ////WAS 5      then 7       2
                  if (this.playSound){                                                /////////// SET UP THE SOUND                                                          
                    this.audArray[this.audCounter].src = this.playSound;
                    this.audArray[this.audCounter].currentTime = 0;
                    this.audArray[this.audCounter].volume= gVolume * .9;
                    this.currentAud = this.audArray[this.audCounter];  
                    this.currentAud.play();    
             //    console.log("BE this.audArray[this.audCounter].src= "  + this.audArray[this.audCounter].src);
                    this.audCounter++;  
                    if(this.audCounter>6){this.audCounter=2;}//reset counter, random instrument files played in audios 2-5
                    
                    if (this.action){   this.currentAction = this.action; }  ////    ::::  these are animations tied to the timing beats  JUST MOVED THIS
                    
                    
                    /*
                    if ( gFile.getRandomNum(10) <2) {          //play other instrument
                      this.randAud = gFile.getRandomFile(this.playSound[4], this.playSound[5], this.playSound[2], this.playSound[3] );   
                      this.audArray[this.audCounter].src = this.randAud;
                      this.audArray[this.audCounter].currentTime = 0;
                      this.audArray[this.audCounter].volume= gVolume * 0.3;
                      this.currAuxAud = this.audArray[this.audCounter];                    
                      this.audCounter++;  
                      if(this.audCounter>6){this.audCounter=2;}//reset counter, random instrument files played in audios 2-5
                    }
                    */
                    
                    
                  }                               
                }                            
              break; 
     
               default:  
                
           } ///switch (this.count32s)                            
                          
             this.count32s++;             
             if (this.count32s > 8) {   this.count32s=1;   this.beatCount++;      }                   
             if (this.beatCount > this.timeSig[0]) {  this.beatCount = 1;   this.barCount++;  }          
             if (this.barCount > this.barsInSect) {
               this.barCount = 1; if(! this.repeatSection){ clearTimeout(this.beatTimeout)  }  
               // reached end of a section, might need to clean the anim list
               this.cleanAnimList();
                                   }    //if (this.barCount >                                        
      
     
     if (this.action){   if (this.currentAction) {    ////    ::::  these are animation literals tied to the timing beats
        //  this gets triggered by the random in case 8, brushes above
          this.isSameImg = this.currentAction[0] (this.currentAction[1], this.currentAction[2], this.currentAction[3]); // method literal   ... issameimg set in anim now, not needed now                  
     }               
       
     }             
     
 // if (this.currAuxAud) { this.currAuxAud.play();   }            
     
     // check for something to animate   ::::  these are constant running animations   
     let anim = 0;
    for (var x = 0; x < this.animArray.length; x++){      
      if(this.animArray[x]){
           anim = this.animArray[x].anime();      ////animator's own action gets done here
            if (anim){  this.animArray[x]=0;      }  }   }  
     this.startTime = new Date().getTime(); 
     this.beatTimeout = setTimeout(BeatEngineRollIt, this.millsecTimer); /// ROLL AGAIN ----------     
 }         ////end RollIt
      
 
 
 
 
  cleanAnimList(){    
    let tempList=[];
     for (var y = 0; y < this.animArray.length; y++){      
      if(this.animArray[y]){
         tempList.push(this.animArray[y]);
             }   } 
    this.animArray=tempList;         
  }
     
  //  ----------    SET N GET
 
  set tempo(BPM) {  if (BPM) {
    this.tempo = (60000/BPM)/8;     
  }      }
  get tempo() {    return this.tempo;  }
    
  set barsInSect(bars) {     if (bars) {this.barsInSect = bars;}  }
  get barsInSect() {    return this.barsInSect;  } 

  get barCount() {    return this.barCount;  } 
  get beatCount() {    return this.beatCount;  } 
  get count32s() {    return this.count32s;  } 
  
  set timeSig(tSig) {    if (tSig) {this.timeSig = tSig; }  }
  get timeSig() {    return this.timeSig;  }   
 
}






