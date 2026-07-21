/// background-color: #0a0a0a;   background-color: #ffffff;

const gFile = new Xfile();

        /// PROJECT SPECIFIC & CARRY THRU GLOBALS & SETTINGS
const gFolderBase = "assets/";     
const gAudExtension = ".ogg";
const gImageExtension = ".png";
const gFilePrefix = "0";  

let gBeatEngine = 0;
    let gLoopAud =  0;      // for some reason losing hold of it if put inside gBeatEngine object, won't kill at pause time       
      let gLoopSrc = gFolderBase + "AUDIO/shuffle_loop.ogg";
      let gLoopVol = .2;

let gSectionNums = 2;  //  2=stop on section 2, full Bella  ||  3=go to cobbles section  //  pass this into anim constructor later, not done yet
let gCounter = 0;
let gStartCounter = 0;
let gVolume = 1;
let gOpenedUp = 0;       /// can we see main Bella yet?  == inside Mode2
let gDoingOpen = 0;        /// going to Mode2
let gMode3 = 0;       /// in Mode3
let gDoingM3 = 0;        /// going to Mode3

let gGridFloat = "Grid";
let gRightCover = "RIGHT_cover";
let gLeftCover = "LEFT_cover";
let gBackElement_1 = "ALLEY_BK";
let gBackElement_2 = "BELLA";
let gMainElementsMatrix = 0;

                      ///// for breakout & back of animating little parts, add the short breakout list here. these sds accompany the moves
let gMoveOutAudArr = [gFolderBase + "AUDIO/Brushs/58.ogg", gFolderBase + "AUDIO/Brushs/60.ogg"];                        
let gMoveBackAudArr = [gFolderBase + "AUDIO/Brushs/57.ogg", gFolderBase + "AUDIO/Brushs/59.ogg", gFolderBase + "AUDIO/Brushs/56.ogg"];    


function initialise(){        
  
  document.getElementById(gBackElement_1).style.opacity =  "0";
  document.getElementById(gBackElement_2).style.opacity =  "0";
   
  resetBeatEngine();      ////  still needed here?
  
  ////////  SETUP FOR BEAT ENGINE
  const audList = [];
  audList[0] = gFolderBase + "01" + gAudExtension;         //"AUDIO/Brushs/29" +gAudExtension;      ///"01" + gAudExtension;  // bassy
  audList[1] = gFolderBase + "02" + gAudExtension;         // snarey
  audList[2] = gFolderBase + "02" + gAudExtension;         //"AUDIO/Brushs/26" +gAudExtension;  // snarey  //
  audList[3] = gFolderBase + "02" + gAudExtension;         // snarey   
  
  let bars = [8, true];  // ([bars/Sect, repeat sect?]
  let timeSig = [4,4];
  let BPM = 82;          // loop aud = 82 BPM  
  let millsecTimer = 40;   // f/sec  
  
  gBeatEngine = new Beatengine(bars, timeSig, BPM, audList, millsecTimer);  
  gBeatEngine.action = 0;          
  gBeatEngine.startTime = new Date().getTime();       ///  move to butt trigger?
  gBeatEngine.beatTimeout = setTimeout(BeatEngineRollIt, gBeatEngine.millsecTimer);  
  
  gMainElementsMatrix = initBella();    
  
}   //CALLED FROM event-7 PART A      ----END INITIALISE



function initBella(){
  ////////DIVS: Top 1-11, Right 1-10, Left 1-8, Bott 1-7, Door 1-6, Mid 1-6;     ALL THE SMALL MOVING PORTIONS OF BACKGROUND IMAGE
  
  var topPath = "BELLA/TOP/";
  var topFileNums = 46;  ////pics in folder
  var topArr = [ ["Top1", topPath, topFileNums, "00"],  ["Top2",  topPath, topFileNums, "01"],  ["Top3",  topPath, topFileNums, "03"],  ["Top4",  topPath, topFileNums, "04"],  ["Top5",  topPath, topFileNums, "05"],  ["Top7",  topPath, topFileNums, "08"],  ["Top8",  topPath, topFileNums, "10"],  ["Top9",  topPath, topFileNums, "09"],  ["Top10",  topPath, topFileNums, "11"],  ["Top11",  topPath, topFileNums, "02"]  ];     
  
  var leftPath = "BELLA/LEFT/";
  var leftFileNums = 32;  ////pics in folder
  var leftArr = [ ["Left2", leftPath, leftFileNums, "19"], ["Left4", leftPath, leftFileNums, "23"],  ["Left6", leftPath, leftFileNums, "27"], ["Left8", leftPath, leftFileNums, "31"] ];
  
  var bottPath = "BELLA/BOTT/";
  var bottFileNums = 24;  ////pics in folder
  var bottArr = [  ["Bott2", bottPath, bottFileNums, "21"],  ["Bott3", bottPath, bottFileNums, "00"],  ["Bott4", bottPath, bottFileNums, "07"],  ["Bott5", bottPath, bottFileNums, "11"],  ["Bott6", bottPath, bottFileNums, "15"],  ["Bott7", bottPath, bottFileNums, "19"]  ,  ["Bott8", bottPath, bottFileNums, "23"]   ]; 
                   
  var doorPath = "BELLA/Door/";
  var doorFileNums = 24;  ////pics in folder
  var doorArr = [ ["Door1", doorPath, doorFileNums, "08"], ["Door2", doorPath, doorFileNums, "09"], ["Door3", doorPath, doorFileNums, "19"], ["Door4", doorPath, doorFileNums, "23"], ["Door5", doorPath, doorFileNums, "00"], ["Door6", doorPath, doorFileNums, "04"] ];
    
  var midPath = "BELLA/MID/";
  var midFileNums = 24;  ////pics in folder
  var midArr = [ ["Mid1", midPath, midFileNums, "03"],  ["Mid2", midPath, midFileNums, "15"],  ["Mid3", midPath, midFileNums, "07"],  ["Mid4", midPath, midFileNums, "19"],  ["Mid5", midPath, midFileNums, "11"],  ["Mid6", midPath, midFileNums, "23"]   ];
  
  var rightPath = "BELLA/RIGHT/";
  var rightFileNums = 40;  ////pics in folder
  var rightArr = [ ["Right1", rightPath, rightFileNums, "03"],  ["Right2", rightPath, rightFileNums, "23"],   ["Right3", rightPath, rightFileNums, "07"],   ["Right4", rightPath, rightFileNums, "27"],   ["Right5", rightPath, rightFileNums, "11"],   ["Right6", rightPath, rightFileNums, "31"],   ["Right7", rightPath, rightFileNums, "15"],   ["Right8", rightPath, rightFileNums, "35"],   ["Right9", rightPath, rightFileNums, "19"],   ["Right10", rightPath, rightFileNums, "39"]   ];        
  
  var swapMatrix = topArr.concat(leftArr, bottArr, doorArr, midArr, rightArr);   
 // swapMatrix = resetElSrcs(swapMatrix);  // sources not needed now, since 1st swaps under cover, using for delete the src names
  swapMatrix = addElementOrigProps(swapMatrix);
  swapMatrix.forEach(elArr =>  elArr.push({ breakMove:0 }));  
       
    document.getElementById("FRAME").style.zIndex = "290";    //  playTap_1  playTap  BLleftOver02
    document.getElementById("FRAME_1").style.zIndex = "289";
    document.getElementById(gGridFloat).style.zIndex = "288";  //  "288"
    document.getElementById(gGridFloat).style.opacity = "0.4";
    document.getElementById(gGridFloat).style.width = "760px";
    document.getElementById("playTap_1").style.zIndex = "292";
    document.getElementById("playTap").style.zIndex = "292";
    document.getElementById("home").style.zIndex = "291";
    document.getElementById("playText").style.zIndex = "291";
  //  go to mode white dots + taps  
    document.getElementById("tapM1").style.zIndex = "292";
    document.getElementById("tapM2").style.zIndex = "292";
    document.getElementById("tapM3").style.zIndex = "292";
    document.getElementById("tapM4").style.zIndex = "292";
    document.getElementById("m1").style.zIndex = "291";
    document.getElementById("m2").style.zIndex = "291";
    document.getElementById("m3").style.zIndex = "291";
    document.getElementById("m4").style.zIndex = "291";
  
    document.getElementById(gRightCover).style.zIndex = "50";  
    document.getElementById(gLeftCover).style.zIndex = "3";
  
  //  document.getElementById(gRightCover).nativeElement.src = gFolderBase +"BLACKleftOVERS/02.png";
  
  return swapMatrix; 
 
}  //----------------------end initBella



function playButt(){  
  if(gStartCounter){    /// if coming in after click 'pause' butt, don't want to re-initialise, just carry on, haven't implemented yet    
    resetBeatEngine();
    gStartCounter = 0;    ///  ????
    document.getElementById("playText").innerHTML = ">";                        /////    RUDIMENTARY PLAY BUTTON
    gMainElementsMatrix.forEach(item => gFile.setElProps(item[0], item[4]));    ////////  RESET ALL ELEMENTS TO ORIG LOCS, OPACS, transY, zIndex -- SRC FILES not held yet              
    gOpenedUp = 0;       /// can we see main Bella yet?
    gDoingOpen = 0;  
    document.getElementById(gBackElement_1).style.opacity =  "0"; 
    document.getElementById(gBackElement_2).style.opacity =  "0.1";  
    document.getElementById(gLeftCover).style.opacity =  "1";    //  waas 0
    document.getElementById(gRightCover).style.opacity =  "1";     
    
    if(document.fullscreenElement){document.exitFullscreen();} else {}
         
    gwd.actions.timeline.gotoAndPlay('page1', 'pauseStart');  ////this pauses content where it WAS AT FIRST LOAD   
  }else{  
    gStartCounter = 1;                ///    gets here on first start, & restarts, from play butt
    document.getElementById("playText").innerHTML = "| |";  //"■";    
            
    
    ////    these need to change when implement proper pause
    document.getElementById(gBackElement_1).style.opacity =  "0";
    document.getElementById(gBackElement_2).style.opacity =  "0.1";  
    document.getElementById(gLeftCover).style.opacity =  "1";    //  waas 0
    document.getElementById(gRightCover).style.opacity =  "1";     
    gMode3 = 0; 
                
    
    document.getElementById("loopAudHolder").volume = gLoopVol;
    //////////////////////////////////////////   FIX THIS SOON, ROLL IT ALL THRU "loopAudHolder"
    gLoopAud = new Audio(gLoopSrc);
    gLoopAud.volume = gVolume * gLoopVol;
    gLoopAud.loop=true;
    
    if(document.fullscreenElement){} else {document.documentElement.requestFullscreen(); }      
    
    gwd.actions.timeline.gotoAndPlay('page1', 'Begin');
    
    let allElsMatrix = structuredClone(gMainElementsMatrix);  /// keeping gMainElementsMatrix clean      
    let ranSwapper = new Animator(allElsMatrix, 2000000, 0, "ranImageAud", [gFolderBase, 8], 0, 0,  [gFolderBase + "AUDIO/Brushs/", 61, .6 ], 0, [gMoveOutAudArr, gMoveBackAudArr] );    
    gBeatEngine.animArray.push(ranSwapper);                                                ////  ^^ [aud files path, num in folder, volume multiple]
    
    ///  the grid
    let gridSwapper = new Animator([[gGridFloat,  "leftGrid25/", 25]], 200000, 0, "ranSwapGrid");   //  <-- same as GLITCHER  // add int somewhere for the random multiplier
    gBeatEngine.animArray.push(gridSwapper);
  }
    
   
}



function tester(...args) {
  args.forEach(item => console.log(item));
}


function BeatEngineRollIt(){     if(gBeatEngine){gBeatEngine.rollIt();}  }   // called for timeout 

function  resetBeatEngine(){   ///////////////  NEED A RESET [go to mode 1], A PAUSE [pause in place], AND A STOP [end program] BEAT ENGINE, SPLIT THESE THINGS
  if(gBeatEngine){          
    
    if(gLoopAud){
      ////////////////////////////    FIX THIS SOON, ROLL IT ALL THRU "loopAudHolder"
      document.getElementById("loopAudHolder").loop = false;
      document.getElementById("loopAudHolder").pause();
      document.getElementById("loopAudHolder").currentTime = 0;
      /////////////////////////////////////
      gLoopAud.loop = false;
      gLoopAud.pause();    
      gLoopAud.currentTime = 0;
      gLoopAud = 0;        //// trying stop the phantom sound after pause
      gBeatEngine.playingLoop = 1;  }   ///   so it doesn't start again before BE quits                   
      gBeatEngine.action = 0;  
      gBeatEngine.playSound = 0;
     // gBeatEngine = 0;   
  }                                              
} //called  FROM BEGIN BUTTON


function resetElSrcs(arrMatrix){
 // arrMatrix.forEach(item => document.getElementById(item[0]).nativeElement.src = gFolderBase +item[1]+ item[3] +".png" );
  arrMatrix.forEach(item => item.pop(item[3]) );    
  return arrMatrix;
}

function addElementOrigProps(arrMatrix){
  if(arrMatrix){   
    arrMatrix.forEach(elArr =>  {      ///  each elArr looks like ["Top1", topPath, topFileNums]  want to add an origProps obj at end, to retrieve at breakback in animator
       var el = document.getElementById(elArr[0]);            
       var elStyle = window.getComputedStyle(el);       
      elArr.push({top:elStyle.getPropertyValue("top"), left:elStyle.getPropertyValue("left"), width:elStyle.getPropertyValue("width"), height:elStyle.getPropertyValue("height"), opacity:elStyle.getPropertyValue("opacity"), transform:"translateY(0px)", zIndex:"7" });  ////  
    } );                         
    
  return arrMatrix;
  }        } //----------------------end addElementOrigProps


          
function fullscreen(){
  if(document.getElementById("Fscreen").innerHTML == "[  ]"){    ///GO FULLSCREEN    
    document.documentElement.requestFullscreen();
    document.getElementById("Fscreen").innerHTML = "[]";
  } else {                                                     /// GO SMALL
    document.exitFullscreen();
    document.getElementById("Fscreen").innerHTML = "[  ]";
  }   
}


function changeVolume(){
  var slider = document.getElementById("volSlider");
  setgVol(slider.value); 
 // console.log(`in changevol, gVolume = ${gVolume}`);
}
function setgVol(vol){gVolume = vol; document.getElementById("volSlider").value = vol; }

// Simulate click function
        function clickButton() {
          let ele = document.getElementById("Begin");
          console.log("in clicker " + ele);
            document.querySelector('#Begin').click();
        }



function audEnded(){
 // console.log("in audEnded");
  gBeatEngine.aud1ended = 1;    }



 function homeButt(){
   // console.log("in homebutt");
    location.href = 'https://cabinboi.github.io/in-progress/';
  }

function openupCB(){
     // gBeatEngine.animArray.push(new Animator([[gRightCover,  "BLACKleftOVERS/", 18]], 12, 0, "ranSwap"));  //  <-- GLITCHER
    // fade out cover, fade in Bella    
  console.log("in base openupCB");
      gBeatEngine.animArray.push(new Animator([[gRightCover]], 9, -.1, "F"));         
      gBeatEngine.animArray.push(new Animator([[gBackElement_2]], 8, .1, "F"));       
  
      gDoingOpen = 0;
      gOpenedUp = 1;    /// check later, can DoingOpen double up?
      gBeatEngine.playingLoop = 0;   ///  signal to start loop on next play beat
  }


function goToMode(whichMode){
  console.log("in goToMode whichMode: "  +whichMode);
  
  switch (whichMode) {             

    case 1:                     
      resetBeatEngine();        
      gMainElementsMatrix.forEach(item => gFile.setElProps(item[0], item[4]));    ////////  RESET ALL ELEMENTS TO ORIG LOCS, OPACS, transY, zIndex --               
      gOpenedUp = 0;       /// can we see main Bella yet?
      gDoingOpen = 0;  
      document.getElementById(gBackElement_1).style.opacity =  "0"; 
      document.getElementById(gBackElement_2).style.opacity =  "0.1";  
      document.getElementById(gLeftCover).style.opacity =  "1";    //  waas 0
      document.getElementById(gRightCover).style.opacity =  "1";     

      gMode3 = 0; 

      document.getElementById("loopAudHolder").volume = gLoopVol;
      //////////////////////////////////////////   FIX THIS SOON, ROLL IT ALL THRU "loopAudHolder"
      gLoopAud = new Audio(gLoopSrc);
      gLoopAud.volume = gVolume * gLoopVol;
      gLoopAud.loop=true;

      let allElsMatrix = structuredClone(gMainElementsMatrix);  /// keeping gMainElementsMatrix clean      
      let ranSwapper = new Animator(allElsMatrix, 2000000, 0, "ranImageAud", [gFolderBase, 8], 0, 0,  [gFolderBase + "AUDIO/Brushs/", 61, .6 ], 0, [gMoveOutAudArr, gMoveBackAudArr] );    
      gBeatEngine.animArray.push(ranSwapper);                                                ////  ^^ [aud files path, num in folder, volume multiple]

      ///  the grid
    //  let gridSwapper = new Animator([[gGridFloat,  "leftGrid25/", 25]], 200000, 0, "ranSwapGrid");   //  <-- same as GLITCHER  // add int somewhere for the random multiplier
     // gBeatEngine.animArray.push(gridSwapper);

      break;  /// 
      
    case 2:
      if(gOpenedUp){  ///  for now, we're in 2 already
        console.log("in goToMode gOpenedUp already section: " );
      } 
      else {
        console.log("in goToMode gDoingOpen section: " );
        gDoingOpen = 1;
      }
      break;
      
      default:    
            
  }  ///  end switch
}  ///  end goToMode


  
  
  
  
  
  
  //
