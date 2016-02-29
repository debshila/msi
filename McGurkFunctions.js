/**
 * Created by beauchamplab on 2/18/16.
 */

var time0;
var resp;
var trialNum=0;
var videos = [];


data=[];//"Trial,MovieName,Response,ReactionTime\n";
var stim;
window.onload = beginTask;

/*
 function getElIntoArray(id){
 var arr = String(document.getElementById(id).value);
 return arr.split(',')
 }
 */
//Generating the stimulus sequence
function generateVideos() {
    var tmp = [];
    var mcgTmp = [];
    var allStim = newStimArr();
    var congruent = allStim[0];
    var mcgurk = allStim[1];
    var congReps = allStim[2];
    var mcgReps = allStim[3];

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
    return videos;
}

/*
 Remove temporary variables
 delete tmp;
 delete mcgTmp;


 generateStimuli(congruent, congReps, videos);
 generateStimuli(mcgurk, mcgReps, videos);
 console.log(videos);
 videos = shuffle(videos);
 console.log(videos);
 */
var N;

function checkLoaded() {
    return document.readyState === "complete";
}
/*
 function generateStimuli(stim, reps, mainArray){
 for(var i =0; i<stim.length; i++){
 for(var j = 0; j<reps; j++){
 mainArray.push(stim[i] + '.mp4');//[j] =
 }
 }
 }
 */

function newStimArr(){
    var cong = String(document.getElementById('cong').value).split(',');
    var mcg = String(document.getElementById('mcg').value).split(',');
    var cRep = parseInt(document.getElementById('cRep').value);
    var mRep = parseInt(document.getElementById('mRep').value);
    return [cong, mcg, cRep, mRep];
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
        stim.play();
        setTimeout(enableButtons,stim.duration*1000);
    }, false);
    //beginTask();
}

/*
 function start(){
 newStimArr();
 setupStim();
 }
 */

function Demo(){
    var demoVid = document.getElementById('demoVid');
    demoVid.play();
    generateVideos();
    document.getElementById('start').style.visibility = "visible";
    newStimArr();
    N = videos.length;
    return N;
}

function beginTask(){
    document.getElementById('demoButton').style.visibility = "visible";
    //  checkLoaded();
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
    stim = document.getElementById('movie');
    stim.src = "https://s3.amazonaws.com/mcgurkstimuli/" + videos[trialNum];
    document.getElementById('p3').innerHTML = (trialNum + 1)+ ' / '+ N;
    stim.addEventListener('loadeddata', function() {
        stim.play();
        setTimeout(enableButtons,stim.duration*1000);
    }, false);

//    stim.play();
//    setTimeout(enableButtons,stim.duration*1000);
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