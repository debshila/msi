var trialNum=0;
var videos = [];
var N;


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
}
