function selectFunc(val){
    var dropdown = document.getElementById("myselect");
    var video = document.getElementById("video");
    video.src = "video/" + val;
    video.play();
}