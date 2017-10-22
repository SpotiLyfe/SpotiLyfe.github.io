function selectFunc(val){
    
    var millisecondsToWait = 1500 * Math.random() + 500;
    setTimeout(function() {
        var dropdown = document.getElementById("myselect");
        var video = document.getElementById("video");
        video.src = "video/" + val;
        video.play();

        makeChips(val);
    }, millisecondsToWait);
    

}

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