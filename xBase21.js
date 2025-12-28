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

//var gStarterAud;
 // gStarterAud =  new Audio(gFolderBase + "starter.ogg" ) ;   gStarterAud.play();////cover sound

function initialise(){    
  //setStageBlacks();    
  
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
  gBeatEngine.startTime = new Date().getTime();
  gBeatEngine.beatTimeout = setTimeout(BeatEngineRollIt, gBeatEngine.millsecTimer);       
  
  initBella();
  
 // console.log(`in init, gVolume = ${gVolume}`); 
 
}   //CALLED FROM event-4 PART A      ----END INITIALISE



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



function playButt(){  
  if(gStartCounter){    /// if coming in after 'pause' butt, don't want to re-initialise, just carry on, haven't implemented yet
  // console.log(`yes gCounter`);
    gStartCounter = 0;
    document.getElementById("playText").innerHTML = ">";
    
    gMainElementsMatrix.forEach(item => gFile.setElProps(item[0], item[3]));    ////////  RESET ALL ELEMENTS TO ORIG LOCS, OPACS, transY, zIndex -- SRC FILES not held yet              
    gOpenedUp = 0;       /// can we see main Bella yet?
    gDoingOpen = 0;
    document.getElementById("BLleftOver02").style.opacity = "1";
    document.getElementById("BLleftOver02").style.zIndex = "50"; 
    document.getElementById("BELLA_NEW").style.opacity =  "0.1"; 
    
    
    document.exitFullscreen();    ///********************
   // location.reload();
    resetBeatEngine();
    gwd.actions.timeline.gotoAndPlay('page1', 'pauseStart');  ////this pauses content where it is
   
  }else{
  //  console.log(`no gCounter`);
    gStartCounter = 1;
    document.getElementById("playText").innerHTML = "| |";  //"■";
    document.documentElement.requestFullscreen();   ///********************
    gwd.actions.timeline.gotoAndPlay('page1', 'Begin');
  }
    
  //  gwd.actions.timeline.gotoAndPause(objectId:String, labelName:String);
   // document.getElementById("playText").innerHTML = ">";  
}


          
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



function initBella(){
  ////////DIVS: Top 1-11, Right 1-10, Left 1-8, Bott 1-7, Door 1-6, Mid 1-6; 
  
  var topPath = "BELLA/TOP/";
  var topFileNums = 46;  ////pics in folder
  var topArr = [ ["Top1", topPath, topFileNums, "00"],  ["Top2",  topPath, topFileNums, "01"],  ["Top3",  topPath, topFileNums, "03"],  ["Top4",  topPath, topFileNums, "04"],  ["Top5",  topPath, topFileNums, "05"],  ["Top7",  topPath, topFileNums, "08"],  ["Top8",  topPath, topFileNums, "10"],  ["Top9",  topPath, topFileNums, "09"],  ["Top10",  topPath, topFileNums, "11"],  ["Top11",  topPath, topFileNums, "02"]  ];  
   // console.log("in initBella, topArr: " + topArr);
  
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
  swapMatrix = resetElSrcs(swapMatrix);
  swapMatrix = addElementOrigProps(swapMatrix);
  swapMatrix.forEach(elArr =>  elArr.push({ breakMove:0 }));        
  
  gMainElementsMatrix = structuredClone(swapMatrix);  /// holding for now to access at pause button
 
  //BREAKOUT special case                                                                    ************************************************************
   var moveOutAudArr = [gFolderBase + "AUDIO/Brushs/58.ogg", gFolderBase + "AUDIO/Brushs/60.ogg"];
   var moveBackAudArr = [gFolderBase + "AUDIO/Brushs/57.ogg", gFolderBase + "AUDIO/Brushs/59.ogg", gFolderBase + "AUDIO/Brushs/56.ogg"];    
 // console.log("call fr base1:");
  var ranSwapper = new Animator(swapMatrix, 2000000, 0, "ranImageAud", [gFolderBase, 8], 0, 0,  [gFolderBase + "AUDIO/Brushs/", 61 ], 0, [moveOutAudArr, moveBackAudArr] );  
                                                                                                                          ///// breakout, added the short breakout list here 
 
/*   var moveOutAudArr = [gFolderBase + "AUDIO/Brushs/partAsubset/18.ogg", gFolderBase + "AUDIO/Brushs/partAsubset/19.ogg"];
   var moveBackAudArr = [gFolderBase + "AUDIO/Brushs/partAsubset/20.ogg", gFolderBase + "AUDIO/Brushs/partAsubset/21.ogg", gFolderBase + "AUDIO/Brushs/partAsubset/17.ogg"];    
   var ranSwapper = new Animator(swapMatrix, 2000000, 0, "ranImageAud", [gFolderBase, 8], 0, 0,  [gFolderBase + "AUDIO/Brushs/partAsubset/", 22 ], 0, [moveOutAudArr, moveBackAudArr] ); */
  
  gBeatEngine.animArray.push(ranSwapper); 
   
 //  document.getElementById("BELLA_NEW").style.opacity =  "1";  ///  ******************************************************************
   //document.getElementById("BELLA_NEW").style.zIndex =  "1";
       
    document.getElementById("WHITE_FRAME_1").style.zIndex = "90";    //  playTap_1  playTap  BLleftOver02
    document.getElementById("playTap_1").style.zIndex = "193";
    document.getElementById("playTap").style.zIndex = "194";
    document.getElementById("home").style.zIndex = "191";
    document.getElementById("playText").style.zIndex = "192";
    document.getElementById("BLleftOver02").style.zIndex = "50"; 
    document.getElementById("BLleftOver02").nativeElement.src = gFolderBase +"BLACKleftOVERS/02.png";
 
}  //----------------------end initBella


function resetElSrcs(arrMatrix){
  arrMatrix.forEach(item => document.getElementById(item[0]).nativeElement.src = gFolderBase +item[1]+ item[3] +".png" );
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




function  ranImageAud(imagePathNum, elementArr, numMoves, audPathNum){      
                   // ["Image path", numFiles], image element to swap, num anim Moves, ["Aud path", numFiles]; 
                                ///elmntArr, numMovements, increments, whatMotion, files, sequence, callBack, audList, millsecs
      
  // element becomes elArray;  get a random element from that in Animator, send it to ranImageAudCB;
//  console.log("call fr base 2:");
   let ranSwapper = new Animator(elementArr, numMoves, 0, "ranImageAud", imagePathNum, 0, 0, audPathNum );         
   gBeatEngine.animArray.push(ranSwapper);  
  
  }     //  called in init   ///NOT USED NOW
///-----------END  ranImageAud

function  ranImageAudCB(element, imgFolder, numFiles){  
   var returner = gFile.swapRandomImage( element, imgFolder, numFiles, gFilePrefix, gImageExtension);   
   
    if(gFile.getRandomNum(1000)<10){  ///start rotater     
       //[elmntArr, numMovements, increments, whatMotion, files, sequence, callBack, audList, millsecs ]// 10
       let transF = "rotateY(0deg)";
       document.getElementById(element).style.transform = transF; //init  put somewhere else for all
   //   console.log("call fr base 3");
       let rotator = new Animator([[element]], 5, 36, "Y");  //         
       gBeatEngine.animArray.push(rotator);
      }  

  return returner;     
}   ///NOT USED NOW moved inside animator

///////////////////////// A PAIR WITH ranImageAud ^^^



    
function  frameLines(imagePathNum, element, numMoves){   
  console.log("call fr base 4");
      let ranSwapper = new Animator(element, numMoves, 0, "R", imagePathNum);         
      gBeatEngine.animArray.push(ranSwapper);      
    }

//// END Random Image + Aud




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












///::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
////////////////// OLD BITS


//from here down mostly AUD specific

function setupDoorSigns(){
  //this triggers a sequence in Animator: doNothing, then Stutter, then flash
//  console.log("call fr base 5");
  //  ANOTHER LAYER TO ADD  HERE -- THE AUDIO    
  let open=new Animator("signholder", 16, 0, "S", [gFolderBase + gDoor.open[0], gDoor.open[1]], 0, [this.doorSigns], 0 ); // 4th
   //
  let urlBase=gFolderBase + gDoor.flash[0];
  let flash=new Animator("signholder", 5, 0, "S", [urlBase, gDoor.flash[1]], open, 0, [urlBase+"00"+gAudExtension], 0 ); // 3rd
      urlBase=gFolderBase + gDoor.stutter[0];
 //
  let stutter=new Animator("signholder", 20, 0, "R", [urlBase, gDoor.stutter[1]], flash, 0, [urlBase+"00"+gAudExtension], 0  );// 2nd
 //
  let doNothing=new Animator("signholder", 30, 0, 0, 0, stutter, 0, 0 ); // first  
  gBeatEngine.animArray.push( doNothing );  
}  //  called from animateDoorSigns()



function setSlideAnim(){
 //    console.log("call fr base 6");
  gBeatEngine.animArray.push(new Animator("BLACK_TOP", 47, -3, "T"));  
  gBeatEngine.animArray.push(new Animator ("BLACK_BOTT", 44, 3, "T"));   
  gBeatEngine.animArray.push(new Animator ("SIDEcoverLEFT", 40, 3, "L"));  
  gBeatEngine.animArray.push(new Animator ("SIDEcoverRIGHT", 40, -3, "L"));    
  }  /// called from coverslide()


////////////////////////////////////  TIMELINE FUNCTIONS

function doSetup(){   initialise();   }  //CALLED FROM eVENT 10 gwd.setglobals  



function animateDoorSigns(){  setupDoorSigns() } /// called at INIT

function playfirstAudrey () {  gAudreyaud =  new Audio('9AUDREYS.mp3') ;   gAudreyaud.play(); }//called from tap area gwd.playfirstAudrey  

function coverslide(){  setSlideAnim();    } // CALLED from Event 11 gwd.MainMarker

function ProceedStop(){    gwd.actions.timeline.play('page1')  }/// called from onstage shape  gwd.ProceedStop

function WAITforclick() {    gwd.actions.timeline.pause('page1'); }//called from event 15 at Wait for Click gwd.WAITclick

function doortoLane(){   resetBeatEngine();  } ///CALLED FROM EVENT 8 near T4 end gwd.pauseclicks


// the black used #0a0a0a  body {  background-color: #0a0a0a;} rgb(10,10,10) ///WAS 255,255,255
///    add to html, body { in main CSS, shads inside GWD app
////gwd.actions.timeline.pause('page1');
//https://stackoverflow.com/questions/14834520/html5-audio-stop-function
//Audio.prototype.stop = function() {    this.pause();     this.currentTime = 0; };




function setStageBlacks() {         
   document.getElementById("SIDEcoverLEFT").style.left =  "-480px";      
   document.getElementById("SIDEcoverRIGHT").style.left =  "657px";       
  document.getElementById("BLACK_TOP").style.top =  "-228px";
  document.getElementById("BLACK_BOTT").style.top =  "524px";
}  //  called from Initialise()




///////////////////  WINDOW FADE SEQUENCE
//////////////////////////SUPERSEDED BY THE FLOATER CLASS

function callBack(obj){
  console.log("callback:: "+obj);   
}



// gridMoveFade(); 
function floatMe(element){    //FADE IN & MOVE  
  document.getElementById("FLOAT01").style.top =  "0px";
  document.getElementById("FLOAT01").style.left =  "0px";
  document.getElementById("FLOAT01").style.opacity =  "0";
 //  console.log("call fr base 7");
  gBeatEngine.animArray.push(new Animator("FLOAT01", 100, -1, "T")); 
  gBeatEngine.animArray.push(new Animator("FLOAT01", 100, 1, "L"));
  
  let stringFunction = "fadeOut";  
  let mover = new Animator("FLOAT01", 40, .02, "F",0, 0, [window[stringFunction]] );
  gBeatEngine.animArray.push(mover);    
}

function fadeOut(){  //FADE OUT  
 let stringFunction = "fadeWait";
  // console.log("call fr base 8");
 let mover = new Animator("FLOAT01", 52, -.02, "F",0, 0, [window[stringFunction]] );  
   gBeatEngine.animArray.push(mover);
}

function fadeWait(){  //RANDOM WAIT  
 let stringFunction = "floatMe";
  let stringElement = "26";
  let waitArray = [4,50,140,280,520,700,900,1500];
  let randNum = gFile.getRandomNum(waitArray.length); 
//   console.log("call fr base 9");
  let mover = new Animator("FLOAT01", waitArray[randNum], 0, "N",0, 0, [window[stringFunction](stringElement)] );
 gBeatEngine.animArray.push(mover);   
}


///////////////////  END WINDOW FADE SEQUENCE


function  beginOn(){  
  document.getElementById("Begin").style.opacity="1";
}


function  beginOff(){   document.getElementById("Begin").style.opacity="0"; }




/////////////OLDER
  ///SHADS SPECIFIC
  /*
  let FLOAT01files = [gFolderBase + "FLOAT01/", 25];
  let topRange = [-20, 400];  //lowest num, & range for random  
  let elementArr = [["FLOAT01",topRange,0,100,-1,1, 40, .02, FLOAT01files,1], ["FLOAT03",0,0,100,1,0, 40, .03], ["FLOAT04",0,0,100,2,0, 40, .01]];    
  gFloaters = new AllFloaters(elementArr);  
  */
  ///END SHADS 
  
  ////Random Image + Aud -- the old door anim
  //gFile.swapImage("signholder", gFolderBase+ "PINK PORTO/"+"00.png");   
 
 // gFile.swapImage("BellaDoor5", gFolderBase+ "BELLA/Bella Door 5/"+"20.png"); 
//  ranImageAud([gFolderBase + "BELLA/Bella Door 5/", 24], "BellaDoor5", 20000, [gFolderBase + "AUDIO/Brushs/", 46]) ;
  ///24? OR 23?
 /////////////// gFile.swapImage("BellaDoor6", gFolderBase+ "BELLA/Bella Door/"+"16.png"); 
 // ranImageAud([gFolderBase + "BELLA/Bella Door 5/", 24], "BellaDoor6", 20000, [gFolderBase + "AUDIO/Brushs/", 46]) ;  
  
  /*
  THE GREY LINES - HAVE TAKEN THESE DIVS OUT OF WD STAGE:"LEFT2" ... TO "TOP3", NEED TO REPLACE IF USED
  frameLines([gFolderBase + "DOOR/FRAME lines/LEFT2/", 3], "LEFT2", 20000);
  frameLines([gFolderBase + "DOOR/FRAME lines/LEFT3/", 3], "LEFT3", 20000);
  frameLines([gFolderBase + "DOOR/FRAME lines/BOTTOM2/", 3], "BOTT2", 20000);
  frameLines([gFolderBase + "DOOR/FRAME lines/BOTTOM3/", 3], "BOTT3", 20000);
  frameLines([gFolderBase + "DOOR/FRAME lines/RIGHT2/", 3], "RIGHT2", 20000);
  frameLines([gFolderBase + "DOOR/FRAME lines/RIGHT3/", 3], "RIGHT3", 20000);
  frameLines([gFolderBase + "DOOR/FRAME lines/TOP2/", 3], "TOP2", 20000);
  frameLines([gFolderBase + "DOOR/FRAME lines/TOP3/", 3], "TOP3", 20000);  
  */
  
 //  gFile.stopAudio (gStarterAud, 0);


// gFile.swapRandomImage( "OverWhite", gFolderBase + "DOOR/Over Whites/", 11, gFilePrefix, gImageExtension);



///FROM AUD

/*

function presentPage1(){  if( typeof gLane !== 'undefined' ){   gLane.visits++;   gwd.actions.timeline.gotoAndPause('page1', 'MAIN');}    }



function testParams(pageID){ 
  console.log("ID: "  + pageID);
  gwd.actions.gwdPagedeck.goToPage('pagedeck', pageID);   } //, 'slide', 1000, 'linear', 'top');   


*/

//called when page 1 ready to present  gwd.presentPage()



/*
  gLane = new Enviro(1);
  gDoor = new Enviro(0);
    gDoor.stutter=["DOOR/stutter/", 4]; 
    gDoor.flash=["DOOR/flash/", 5];  
    gDoor.signs=["DOOR/SIGNS/", 23];
    gDoor.brushes=["AUDIO/Brushs/", 46];    
    gDoor.open=["DOOR/opSign/", 16];
  gBella = new Enviro(0);
  gSky = new Enviro(0);
  gTunnel = new Enviro(0);  
  */

 // gBeatEngine.animArray.push(new Animator("FLOAT01", 52, -.02, "F" ));  
  // gBeatEngine.animArray.push(new Animator("FLOAT01", 50, .02, "F" ));
//   console.log("in init "+ document.getElementById("FLOAT01").style.opacity);
   
              //  files, sequence, callBack
 

  
  /*
   let open=new Animator("signholder", 16, 0, "S", [gFolderBase + gDoor.open[0], gDoor.open[1]], 0, [this.doorSigns], 0 ); // 4th
   //
  let urlBase=gFolderBase + gDoor.flash[0];
  let flash=new Animator("signholder", 5, 0, "S", [urlBase, gDoor.flash[1]], open, 0, [urlBase+"00"+gAudExtension], 0 ); // 3rd
  */

// console.log("in fade seq OPAC: " + document.getElementById("FLOAT01").style.opacity);
  //document.getElementById("FLOAT01").style.opacity =  "1";  
 // document.getElementById("FLOAT01").style.opacity =  param; 
 //  console.log("in fade seq OPAC: " + document.getElementById("FLOAT01").style.opacity);


  //  let greyLINEfiles = [gFolderBase + "greyLINE/", 5];
//  let elementArr = [["FLOAT01",topRange,0,100,-1,1, 40, .02, FLOAT01files,1], ["FLOAT03",0,0,100,1,0, 40, .03], ["FLOAT04",0,0,100,2,0, 40, .01], ["greyLINE",400,200,100,0,0, 40, .02, greyLINEfiles]];    
         // floatA [[element, top, left, numMoves, incT, incL, fadeTime, fadePoints]],[]]

 ///// https://stackoverflow.com/questions/19126432/rotate-a-div-using-javascript

//gBeatEngine.action = [gFile.swapRandomImage, "signholder", gFolderBase + signs[0], signs[1], gFilePrefix, gImageExtension ];
//  gBeatEngine.playSound = [gFolderBase + brushes[0], brushes[1], "0", ".ogg"]; 


