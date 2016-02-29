/**
 * Created by beauchamplab on 2/18/16.
 */

var time0;
var resp;
var trialNum=0;
var videos = [];
var stimArr = new Object();
var congruent = stimArr["congruent"];
var mcgurk = stimArr["mcgurk"];
var mcgReps = stimArr["mcgReps"];
var congReps = stimArr["congReps"];

data=[];//"Trial,MovieName,Response,ReactionTime\n";
var stim;
tmp = [];
mcgTmp = [];


function getElIntoArray(id){
    var arr = document.getElementById(id).innerHTML;
    arr = String(arr);
    return arr.split(',')
}

//Generating the stimulus sequence

for(var i = 0; i < congruent.length; i++){
    for(var j = 0; j<congReps; j++){
        tmp.push(congruent[i]);
    }
}
//shuffling congruent stimuli
tmp = shuffle(tmp);

//Generating McGurk sequence and adding congruent stimuli
for(var b = 0; b<mcgReps; b++){
    for(var a =0; a<mcgurk.length; a++){
        mcgTmp.push(mcgurk[a]);
    }
    mcgTmp.push(tmp[b]);
}

//shuffling each block
for(var c = 0; c<mcgTmp.length;c+=(mcgReps+1)){
    videos.push(shuffle(mcgTmp.slice(c, c+(mcgReps+1))));

}

//Flattening array of arrays
videos = [].concat.apply([], videos);

//Remove temporary variables
delete tmp;
delete mcgTmp;

/*
 generateStimuli(congruent, congReps, videos);
 generateStimuli(mcgurk, mcgReps, videos);
 console.log(videos);
 videos = shuffle(videos);
 console.log(videos);
 */
var N = videos.length;

window.onload = screenBrowser;//beginTask;


function generateStimuli(stim, reps, mainArray){
    for(var i =0; i<stim.length; i++){
        for(var j = 0; j<reps; j++){
            mainArray.push(stim[i] + '.mp4');//[j] =
        }
    }
}

function newStimArr(){

    stimArray = {
        congruent: getElIntoArray('cong'),
        mcgurk: getElIntoArray('mcg'),
        congReps: parseInt(document.getElementById('cRep').innerHTML),
        mcgReps: parseInt(document.getElementById('mRep').innerHTML)
    };
    return stimArr;
}


function screenBrowser(){
    //browser = window.navigator.userAgent.toLowerCase();
    if (browserList.indexOf(objbrowserName) == -1 )
    {
        document.getElementById('container').style.visibility = "hidden";
        alert('This browser is not compatible for this task. Please switch to either of ' + browserList);
    } {
        stimArr = newStimArr();
        return stimArr;
        beginTask();
        setupStim();

    }
    document.getElementById("browser").innerHTML =  "<input type='hidden' name='browser' value = " + objbrowserName + ">";

}


//to randomly arrange stimuli
function shuffle(X) {
    var N = X.length - 1;
    var t = 0;
    for (var i = N; i > 0; i--) {
        var r = Math.floor(( i + 1) * Math.random());
//r is random integer from 0 to i;
// swap the ith element with the rth element;
        t = X[r];
        X[r] = X[i];
        X[i] = t;
    }
    return X
}

var browserList =["Chrome", "Safari", "Microsoft Internet Explorer", "Netscape", "Firefox"]; //screen out firefox users
var objappVersion = navigator.appVersion;
var objAgent = navigator.userAgent;
var objbrowserName  = navigator.appName;
var objfullVersion  = ''+parseFloat(navigator.appVersion);
var objBrMajorVersion = parseInt(navigator.appVersion,10);
var objOffsetName,objOffsetVersion,ix;


// In Chrome
if ((objOffsetVersion=objAgent.indexOf("Chrome"))!=-1) {
    objbrowserName = "Chrome";
    objfullVersion = objAgent.substring(objOffsetVersion+7);
}
// In Microsoft internet explorer
else if ((objOffsetVersion=objAgent.indexOf("MSIE"))!=-1) {
    objbrowserName = "Microsoft Internet Explorer";
    objfullVersion = objAgent.substring(objOffsetVersion+5);
}

// In Firefox
else if ((objOffsetVersion=objAgent.indexOf("Firefox"))!=-1) {
    objbrowserName = "Firefox";
    objfullVersion = objAgent.substring(objOffsetVersion+5);
}
// In Safari
else if ((objOffsetVersion=objAgent.indexOf("Safari"))!=-1) {
    objbrowserName = "Safari";
    objfullVersion = objAgent.substring(objOffsetVersion+7);
    if ((objOffsetVersion=objAgent.indexOf("Version"))!=-1)
        objfullVersion = objAgent.substring(objOffsetVersion+8);
}
// For other browser "name/version" is at the end of userAgent
else if ((objOffsetName=objAgent.lastIndexOf(' ')+1) <
    (objOffsetVersion=objAgent.lastIndexOf('/')) )
{
    objbrowserName = objAgent.substring(objOffsetName,objOffsetVersion);
    objfullVersion = objAgent.substring(objOffsetVersion+1);
    if (objbrowserName.toLowerCase()==objbrowserName.toUpperCase()) {
        objbrowserName = navigator.appName;
    }
}
// trimming the fullVersion string at semicolon/space if present
if ((ix=objfullVersion.indexOf(";"))!=-1)
    objfullVersion=objfullVersion.substring(0,ix);
if ((ix=objfullVersion.indexOf(" "))!=-1)
    objfullVersion=objfullVersion.substring(0,ix);

objBrMajorVersion = parseInt(''+objfullVersion,10);
if (isNaN(objBrMajorVersion)) {
    objfullVersion  = ''+parseFloat(navigator.appVersion);
    objBrMajorVersion = parseInt(navigator.appVersion,10);
}


function disableButtons(){
    var col = "#A9A9A9";
    document.getElementById('ba').disabled = true;
    document.getElementById('da').disabled = true;
    document.getElementById('ga').disabled = true;
    document.getElementById('ba').style.color = col;
    document.getElementById('da').style.color = col;
    document.getElementById('ga').style.color = col;
}

function enableButtons(){
    document.getElementById('ba').disabled = false;
    document.getElementById('da').disabled = false;
    document.getElementById('ga').disabled = false;
    document.getElementById('ba').style.color = "white";
    document.getElementById('da').style.color = "white";
    document.getElementById('ga').style.color = "white";
}

function setupStim(){
    stim = document.getElementById('movie');
    stim.addEventListener('loadeddata', function() {
        /*stim.defaultPlaybackRate = rates[trialNum];
         stim.playbackRate = rates[trialNum];*/
        stim.play();
        setTimeout(enableButtons,stim.duration*1000);
    }, false);
}


function Demo(){
    var demoVid = document.getElementById('demoVid');
    demoVid.play();
    document.getElementById('start').style.visibility = "visible";
}

function beginTask(){
    document.getElementById('demoButton').style.visibility = "visible";
}

function Stimulus(trialNum, movieName,response, rt) {
    this.trialNum = trialNum;
    this.movieName = movieName;
    this.response = response;
    this.rt=rt;
}

function showOptions(){
    document.getElementById('ba').style.visibility = "visible";
    document.getElementById('da').style.visibility = "visible";
    document.getElementById('ga').style.visibility = "visible";
}

function hideOptions(){
    document.getElementById('ba').style.visibility = "hidden";
    document.getElementById('da').style.visibility = "hidden";
    document.getElementById('ga').style.visibility = "hidden";
}

function hideEverything(){
    hideOptions();
    hide('movie');
}
Stimulus.prototype.toString = function () {
    var trial = "<input type='hidden' name='Trial_" + String(this.trialNum +1)+"'" + " value = " + (this.trialNum +1) + ">";
    var stimulus = "<input type='hidden' name='stimulus_"+ String(this.trialNum +1)+"'" + " value = " + this.movieName + ">";
    var resp = "<input type='hidden' name='Response_"+String(this.trialNum +1)+"'"+ " value = " + this.response + ">";
    var responseTime = "<input type='hidden' name='ReactionTime_"+String(this.trialNum +1)+"'"+" value = " + this.rt + ">";
    var output = trial + stimulus + resp + responseTime;
    return output
};

function hide(ID){
    document.getElementById(ID).style.visibility = "hidden";
}


function playVideo(){
    document.getElementById('instructions').innerHTML = "";
    document.getElementById('demoVideoBox').innerHTML = "";
    stim.src = "https://s3.amazonaws.com/mcgurkstimuli/" + videos[trialNum];
    document.getElementById('p3').innerHTML = (trialNum + 1)+ ' / '+ N;
    time0=performance.now();
    return time0;
}


function choice(resp){
    var time1 = performance.now();
    stim.rt = Math.round(time1-time0);
    stim.response = resp;
    videos[trialNum] = new Stimulus(trialNum,stim.src,resp,stim.rt);
    videos[trialNum].rt = stim.rt;
    videos[trialNum].response = stim.response;
    videos[trialNum].movieName = stim.src;
    videos[trialNum].trial=trialNum;
    data +=videos[trialNum];
    trialNum++;
    if (trialNum<N){
        disableButtons();
        playVideo();
    }
    else {
        hideOptions();
        hide('movie');
        document.getElementById("inputfields").innerHTML = data;
        document.getElementById('p3').innerHTML = "Thank you for your participation. In order to receive credit, please click the submit button.";
        document.getElementById("submitButton").style.visibility = "visible";
    }
}
