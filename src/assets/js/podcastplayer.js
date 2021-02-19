//credits to Alex Katz, for details visit http://alexkatz.me/posts/building-a-custom-html5-audio-player-with-javascript/
console.log("podcast script is loaded");

var podcast_audio_files = document.getElementsByClassName("podcast_audio_files");
var playhead = document.getElementById('playhead'); // playhead
var timeline = document.getElementById('timeline'); // timeline
var sounds = document.getElementsByTagName('audio');

var symbol_play = "/assets/logos/2070_button_play.png"
var symbol_pause = "/assets/logos/2070_button_pause.png"


//create array of AUDIO FILES
// var arrayAllAudioFiles = document.getElementById("audio_files").getElementsByTagName("audio");
//var arrayAllAudioFiles = document.getElementsByClassName('podcast_audio_files');
var arrayAllAudioFiles = document.getElementById("audio_files");
console.log("arrayAllAudioFiles: "+ arrayAllAudioFiles);

//create array of PODCAST LIST ELEMENTS
var arrayPodcastsList = document.getElementsByClassName('podcast_track_list')[0].getElementsByTagName("div");
//var arrayPodcastsList = document.getElementsByClassName('player-controls');
console.log("arrayPodcastsList: "+ arrayPodcastsList);

var number_of_first_track = document.getElementById(arrayPodcastsList[0].id).getElementsByClassName('track_number')[0].innerHTML;
var title_of_first_track = document.getElementById(arrayPodcastsList[0].id).getElementsByClassName('track_name_title')[0].innerHTML;
document.getElementById("current_podcast_track_name_number").innerHTML = number_of_first_track;
document.getElementById("current_podcast_track_name").innerHTML = title_of_first_track;

// create  EVENT LISTENER for CURRENT PODCAST TRACK
document.getElementById('current_podcast_click_area').addEventListener("click", function(){
    let current_track_id = document.getElementById('current_podcast_track_name_number').innerHTML;
    let current_track = 'current_podcast_click_area';
    playAudio(current_track_id, current_track);
});

// create EVENT LISTENERS for each PODCAST LIST ELEMENT
for (i = 0; i < arrayAllAudioFiles.length; i++){
    let AudioFileId = arrayAllAudioFiles[i].id;
    let PodcastsListElementId = arrayPodcastsList[i].id;
    arrayPodcastsList[i].addEventListener("click", function(){
        playAudio(AudioFileId, PodcastsListElementId);
    });
}




function playAudio(AudioFileId, PodcastsListElementId){
    //console.log(PodcastsListElementId);
    var sourceID = AudioFileId; //ID of AUDIO TRACK
    //var pButton = document.getElementById(PodcastsListElementId); // play button
    //console.log("sourceid: "+sourceID);
    //console.log(pButton);

    var current_track_number = document.getElementById(PodcastsListElementId).getElementsByClassName('track_number')[0].innerHTML;
    var current_track_name = document.getElementById(PodcastsListElementId).getElementsByClassName('track_name_title')[0].innerHTML;

    var music = document.getElementById(sourceID); // id for audio element
    // console.log(sourceID);
    var duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
    //console.log(duration);
    


    // timeline width adjusted for playhead
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

    // play button event listenter
    play();
    //pButton.addEventListener("click", play);

    // timeupdate event listener
    music.addEventListener("timeupdate", timeUpdate, false);

    // makes timeline clickable
    timeline.addEventListener("click", function(event) {
        moveplayhead(event);
        music.currentTime = duration * clickPercent(event);
        console.log("listening to timeline events");
    }, false);

    // returns click as decimal (.77) of the total timelineWidth
    function clickPercent(event) {
        return (event.clientX - getPosition(timeline)) / timelineWidth;
    }

    // makes playhead draggable
    playhead.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

    // Boolean value so that audio position is updated only when the playhead is released
    var onplayhead = false;

    // mouseDown EventListener
    function mouseDown() {
        onplayhead = true;
        window.addEventListener('mousemove', moveplayhead, true);
        music.removeEventListener('timeupdate', timeUpdate, false);
    }

    // mouseUp EventListener
    // getting input from all mouse clicks
    function mouseUp(event) {
        if (onplayhead == true) {
            moveplayhead(event);
            window.removeEventListener('mousemove', moveplayhead, true);
            // change current time
            music.currentTime = duration * clickPercent(event);
            music.addEventListener('timeupdate', timeUpdate, false);
        }
        onplayhead = false;
    }
    // mousemove EventListener
    // Moves playhead as user drags
    function moveplayhead(event) {
        var newMargLeft = event.clientX - getPosition(timeline);

        if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
            playhead.style.marginLeft = newMargLeft + "px";
        }
        if (newMargLeft < 0) {
            playhead.style.marginLeft = "0px";
        }
        if (newMargLeft > timelineWidth) {
            playhead.style.marginLeft = timelineWidth + "px";
        }
    }



    
    // timeUpdate
    // Synchronizes playhead position with current point in audio
    function timeUpdate() {
        var playPercent = timelineWidth * (music.currentTime / duration);
        playhead.style.marginLeft = playPercent + "px";
        if (music.currentTime == duration) {
            // pButton.className = "";
            // pButton.className = "play";
            //document.getElementById("current_podcast_play_pause_icon").innerHTML = "";
            // document.getElementById("current_podcast_play_pause_icon").innerHTML = symbol_play;
            document.getElementById("current_podcast_play_pause_icon").getElementsByTagName("img")[0].src = symbol_pause;
            let resetPlayClass = document.getElementsByClassName("player-controls pause");
            for (var i = 0; i < resetPlayClass.length; i++) {
                //resetPlayClass.item(i).getElementsByClassName("podcast_play_pause_icon")[0].innerHTML = symbol_play;
                resetPlayClass.item(i).getElementsByClassName("podcast_play_pause_icon")[0].getElementsByTagName("img")[0].src = symbol_play;
                resetPlayClass.item(i).className = "player-controls play";
            }
            document.getElementById("current_podcast_click_area").className = "";
            document.getElementById("current_podcast_click_area").className = "player-controls play";
        }
    }

    //Play and Pause
    function play() {
    //function playAudio(){
        // start music
        if (music.paused) {
            
            let podcast_list_object_number_ID = "podcast_list_object_" + sourceID;

            for (var i = 0; i < arrayPodcastsList.length; i++) {
                // arrayPodcastsList[i].getElementsByClassName("podcast_play_pause_icon")[0].innerHTML = "";                
                // arrayPodcastsList[i].getElementsByClassName("podcast_play_pause_icon")[0].innerHTML = symbol_play;
                arrayPodcastsList[i].getElementsByClassName("podcast_play_pause_icon")[0].getElementsByTagName("img")[0].src = symbol_play;
            }

            var allPauses = document.getElementsByClassName("pause");
            for (var i = 0; i < allPauses.length; i++) {
                // allPauses.item(i).className = "";
                allPauses.item(i).className = "player-controls play";
            }

            //StopAllAudioTags();
            for(i=0; i<sounds.length; i++){
                sounds[i].pause();
            }
            music.play();
            // remove play, add pause
            //pButton.className = "";
            //pButton.className = "player-controls pause";
            document.getElementById(podcast_list_object_number_ID).className = "";
            document.getElementById(podcast_list_object_number_ID).className = "player-controls pause";
            //document.getElementById(podcast_list_object_number_ID).getElementsByClassName("podcast_play_pause_icon")[0].innerHTML = "";
            //document.getElementById(podcast_list_object_number_ID).getElementsByClassName("podcast_play_pause_icon")[0].innerHTML = symbol_pause;
            document.getElementById(podcast_list_object_number_ID).getElementsByClassName("podcast_play_pause_icon")[0].getElementsByTagName("img")[0].src = symbol_pause;


            //document.getElementById("current_podcast_click_area").className = "";
            //document.getElementById("current_podcast_click_area").className = "player-controls pause";

            // document.getElementById("current_podcast_play_pause_icon").innerHTML = "";
            // document.getElementById("current_podcast_play_pause_icon").innerHTML = symbol_pause;
            document.getElementById("current_podcast_play_pause_icon").getElementsByTagName("img")[0].src = symbol_pause;
            document.getElementById("current_podcast_track_name_number").innerHTML = "";
            document.getElementById("current_podcast_track_name_number").innerHTML = current_track_number;
            document.getElementById("current_podcast_track_name").innerHTML = "";
            document.getElementById("current_podcast_track_name").innerHTML = current_track_name;

        } else { // pause music
            music.pause();
            // remove pause, add play
            //document.getElementById("current_podcast_play_pause_icon").innerHTML = "";
            // document.getElementById("current_podcast_play_pause_icon").innerHTML = symbol_play;
            document.getElementById("current_podcast_play_pause_icon").getElementsByTagName("img")[0].src = symbol_play;
            let resetPlayClass = document.getElementsByClassName("player-controls pause");
            for (var i = 0; i < resetPlayClass.length; i++) {
                //resetPlayClass.item(i).getElementsByClassName("podcast_play_pause_icon")[0].innerHTML = symbol_play;
                resetPlayClass.item(i).getElementsByClassName("podcast_play_pause_icon")[0].getElementsByTagName("img")[0].src = symbol_play;
                resetPlayClass.item(i).className = "player-controls play";
            }
            document.getElementById("current_podcast_click_area").className = "";
            document.getElementById("current_podcast_click_area").className = "player-controls play";
        }
    }

    // Gets audio file duration
    music.addEventListener("canplaythrough", function() {
        duration = music.duration;
    }, false);

    // getPosition
    // Returns elements left position relative to top-left of viewport
    function getPosition(el) {
        return el.getBoundingClientRect().left;
    }



    // Countdown/up Audio Track Length

    // Countdown
    var audio = document.getElementById(sourceID);

    audio.addEventListener("timeupdate", function() {
        var timeleft = document.getElementById('timeleft'),
            duration = parseInt( audio.duration ),
            currentTime = parseInt( audio.currentTime ),
            timeLeft = duration - currentTime,
            s, m;
        
        s = timeLeft % 60;
        m = Math.floor( timeLeft / 60 ) % 60;
        
        s = s < 10 ? "0"+s : s;
        m = m < 10 ? "0"+m : m;
        
        timeleft.innerHTML = m+":"+s;
        
    }, false);

    // Countup
    audio.addEventListener("timeupdate", function() {
        var timeline = document.getElementById('duration');
        var s = parseInt(audio.currentTime % 60);
        var m = parseInt((audio.currentTime / 60) % 60);
        if (s < 10) {
            timeline.innerHTML = m + ':0' + s;
        }
        else {
            timeline.innerHTML = m + ':' + s;
        }
    }, false);


}

// show  Podcast list
document.getElementById('podcast_area_all').addEventListener("mouseenter", ShowPodcastList);
document.getElementById('podcast_area_all').addEventListener("swipe-up", ShowPodcastList);

function ShowPodcastList(){
    //alert('Sie sollten doch nicht drücken!');
    document.getElementsByClassName('podcast_track_list')[0].className = "podcast_track_list podcast_list_expanded";

    //document.getElementsByClassName('podcast_track_list')[0].style.visibility = 'visible';
    //document.getElementsByClassName('podcast_track_list')[0].style.height = '150px';
    // document.getElementsByClassName('player-controls').style.height = 'auto';
}
// colapse  Podcast list
document.getElementById('podcast_area_all').addEventListener("mouseleave", CollapsePodcastList);
function CollapsePodcastList(){
    // document.getElementById('podcast_track_list').style.height = '50px';
    document.getElementsByClassName('podcast_track_list')[0].className = "podcast_track_list podcast_list_collapsed";

    //document.getElementsByClassName('podcast_track_list')[0].style.visibility = 'collapse';
    //document.getElementsByClassName('podcast_track_list')[0].style.height = '0';
    // document.getElementsByClassName('player-controls').style.height = '0';
}










// -------------------------- volume control --------------------------

//var audio_volume_control = document.getElementsByTagName('audio');
//var audio_volume_control = document.getElementById('podcast_track_1');
//var audio_volume_control = document.getElementsByClass('podcast_audio_files');



//create array of AUDIO FILES
var volume_controll = document.getElementById("volume").getElementsByTagName("div");
//console.log(volume_controll[0]);
for (i=0; i < volume_controll.length; i++){
    let volume_step_appearance = i;
    volume_controll[i].addEventListener("mouseup", function(){
        setAudioVolumeAppearance(volume_step_appearance);
        setAudioVolume(volume_step_appearance)
    });
}
function setAudioVolumeAppearance(volume_step_appearance){
    document.getElementById('volume_step_1').style.backgroundColor = 'gray';
    document.getElementById('volume_step_2').style.backgroundColor = 'gray';
    document.getElementById('volume_step_3').style.backgroundColor = 'gray';
    document.getElementById('volume_step_4').style.backgroundColor = 'gray';
    for (i=0; i<= volume_step_appearance; i++){
        document.getElementById('volume_step_'+i).style.backgroundColor = 'black';
    }
}
var new_volume = 1.0;
function setAudioVolume(volume_step_appearance){
        if (volume_step_appearance == 0){
            new_volume = 0.2;
        } else if (volume_step_appearance == 1){
            new_volume = 0.4;
        } else if (volume_step_appearance == 2){
            new_volume = 0.6;
        } else if (volume_step_appearance == 3){
            new_volume = 0.8;
        } else {
            new_volume = 1.0;
        }
        for (i = 0; i < arrayAllAudioFiles.length; i++){
            arrayAllAudioFiles[i].volume = new_volume;
        }
}