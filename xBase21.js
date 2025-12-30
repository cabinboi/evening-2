/// background-color: #0a0a0a;   background-color: #ffffff;

var gFloaters; 
var gBeatEngine;
var gFile;

var gFolderBase;
var gAudExtension;
var gImageExtension;
var gFilePrefix;
var gCounter;
var gStartCounter = 0;

var gVolume = 1;

var gMainElementsMatrix = 0;

var gOpenedUp = 0;       /// can we see main Bella yet?
var gDoingOpen = 0;


function initialise(){          
  resetBeatEngine();      ////  still needed here?
  
  gFolderBase = "assets/";     
  gAudExtension = ".ogg";
  gImageExtension = ".png";
  gFilePrefix = "0";   
  gCounter = 0;
  
  gFile=new Xfile();         
    
  var audList = [];
  audList[0] = gFolderBase +  "01" + gAudExtension;         //"AUDIO/Brushs/29" +gAudExtension;      ///"01" + gAudExtension;  // bassy
  audList[1] = gFolderBase + "02" + gAudExtension;  // snarey
  audList[2] = gFolderBase +   "02" + gAudExtension;         //"AUDIO/Brushs/26" +gAudExtension;  // snarey  //
  audList[3] = gFolderBase + "02" + gAudExtension;  // snarey
                                // (bars/Sect, tSig, BPM, [4 aud srcs], millsecTimer--f/s )  shuffle loop=82 BPM
  gBeatEngine = new Beatengine([8, true], [4,4], 82, audList, 40); //// 96 was 60  
  gBeatEngine.action = 0; 

  ///  move to butt trigger?
  gBeatEngine.startTime = new Date().getTime();
  gBeatEngine.beatTimeout = setTimeout(BeatEngineRollIt, gBeatEngine.millsecTimer);       
  
  gMainElementsMatrix = initBella();
  
 
}   //CALLED FROM event-7 PART A      ----END INITIALISE



function playButt(){  
  if(gStartCounter){    /// if coming in after 'pause' butt, don't want to re-initialise, just carry on, haven't implemented yet  
    gStartCounter = 0;    ///  ????
    document.getElementById("playText").innerHTML = ">";    
    gMainElementsMatrix.forEach(item => gFile.setElProps(item[0], item[3]));    ////////  RESET ALL ELEMENTS TO ORIG LOCS, OPACS, transY, zIndex -- SRC FILES not held yet              
    gOpenedUp = 0;       /// can we see main Bella yet?
    gDoingOpen = 0;  
    document.getElementById("BELLA_NEW").style.opacity =  "0.1";  
    document.getElementById("BLleftOver02").style.opacity =  "1"; 
    document.exitFullscreen();     
    resetBeatEngine();
    gwd.actions.timeline.gotoAndPlay('page1', 'pauseStart');  ////this pauses content where it WAS AT FIRST LOAD   
  }else{  
    gStartCounter = 1;                ///    gets here on first start, & restarts, from play butt
    document.getElementById("playText").innerHTML = "| |";  //"■";
    document.documentElement.requestFullscreen();   
    gwd.actions.timeline.gotoAndPlay('page1', 'Begin');
    
   var allElsMatrix = structuredClone(gMainElementsMatrix);  /// keeping gMainElementsMatrix clean  
   var moveOutAudArr = [gFolderBase + "AUDIO/Brushs/58.ogg", gFolderBase + "AUDIO/Brushs/60.ogg"];                        ///// breakout, added the short breakout list here
   var moveBackAudArr = [gFolderBase + "AUDIO/Brushs/57.ogg", gFolderBase + "AUDIO/Brushs/59.ogg", gFolderBase + "AUDIO/Brushs/56.ogg"];    
   var ranSwapper = new Animator(allElsMatrix, 2000000, 0, "ranImageAud", [gFolderBase, 8], 0, 0,  [gFolderBase + "AUDIO/Brushs/", 61 ], 0, [moveOutAudArr, moveBackAudArr] );    
   gBeatEngine.animArray.push(ranSwapper);
  }
    
   
}


function initBella(){
  ////////DIVS: Top 1-11, Right 1-10, Left 1-8, Bott 1-7, Door 1-6, Mid 1-6; 
  
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
  swapMatrix = resetElSrcs(swapMatrix);  // sources not needed now, since 1st swaps under cover, using for delete the src names
  swapMatrix = addElementOrigProps(swapMatrix);
  swapMatrix.forEach(elArr =>  elArr.push({ breakMove:0 }));  
       
    document.getElementById("WHITE_FRAME_1").style.zIndex = "190";    //  playTap_1  playTap  BLleftOver02
    document.getElementById("playTap_1").style.zIndex = "193";
    document.getElementById("playTap").style.zIndex = "194";
    document.getElementById("home").style.zIndex = "191";
    document.getElementById("playText").style.zIndex = "192";
    document.getElementById("BLleftOver02").style.zIndex = "50"; 
  //  document.getElementById("BLleftOver02").nativeElement.src = gFolderBase +"BLACKleftOVERS/02.png";
  
  return swapMatrix;
 
 
 
}  //----------------------end initBella


function BeatEngineRollIt(){     if(gBeatEngine){gBeatEngine.rollIt();}  }   // called for timeout 

function  resetBeatEngine(){   
  if(gBeatEngine){
    console.log(`reset BE 2`);      
    
    if(gBeatEngine.loopAud){
    gBeatEngine.loopAud.pause();    ///***************************************************************
    gBeatEngine.loopAud.currentTime = 0;
    gBeatEngine.playingLoop = 1;  }
    
  gBeatEngine.action = 0;  
  gBeatEngine.playSound = 0;
  gBeatEngine = 0;   
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
      elArr.push({top:elStyle.getPropertyValue("top"), left:elStyle.getPropertyValue("left"), width:elStyle.getPropertyValue("width"), height:elStyle.getPropertyValue("height"), opacity:elStyle.getPropertyValue("opacity"), transform:"translateY(0px)", zIndex:"2" });  ////  
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







