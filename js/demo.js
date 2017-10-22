function selectFunc(val){

    var millisecondsToWait = 1500 * Math.random() + 500;
    setTimeout(function() {
        var dropdown = document.getElementById("myselect");
        var video = document.getElementById("video");
        video.src = "video/" + val;
        video.play();
        addVideoElement(val)
        makeChips(val);
    }, millisecondsToWait);


}

function addVideoElement(video) {
  if(video.indexOf('art') !== -1) {
    document.getElementById("widget").innerHTML = art;
  } else if(video.indexOf('garden') !== -1) {
    document.getElementById("widget").innerHTML = garden;
  } else if(video.indexOf('geyser') !== -1) {
    document.getElementById("widget").innerHTML = geyser;
  } else {
    document.getElementById("widget").innerHTML = hallway;
  }


}

var geyser = '<iframe src="https://open.spotify.com/embed/track/3llHPPHKJ9bBYh9pg9TBbf" width="380" height="80" frameborder="0" allowtransparency="true"></iframe>';
var garden = '<iframe src="https://open.spotify.com/embed/track/526YVuTYcOYJLXeuobJV2H" width="380" height="80" frameborder="0" allowtransparency="true"></iframe>';
var art = '<iframe src="https://open.spotify.com/embed/track/2C6BCDdtYjbbbAucqaw9NG" width="380" height="80" frameborder="0" allowtransparency="true"></iframe>';
var hallway = '<iframe src="https://open.spotify.com/embed/track/7Bhoz0sski6qD2ZleEDUJ2" width="380" height="80" frameborder="0" allowtransparency="true"></iframe>';

function makeChips(val){
    var tags = document.getElementById("tags");

    var arr = [];
    if(val === "art.MOV"){
        arr.push("white");
        arr.push("wall");
        arr.push("circle");
        arr.push("picture");
    }
    if(val === "garden.MOV"){
        arr.push("outdoors");
        arr.push("green");
        arr.push("tree");
        arr.push("trail");
        arr.push("leaves");
    }
    if(val === "geyser.MOV"){
        arr.push("water");
        arr.push("fountain");
        arr.push("outdoors");
        arr.push("sun");
        arr.push("sky");
    }
    if(val === "hallway.MOV"){
        arr.push("hallway");
        arr.push("white");
        arr.push("building");
        arr.push("square");
    }

    tags.innerHTML = "Tags: [" + arr + "]";
}
