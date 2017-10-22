var video = document.getElementById('player');   
var input = document.getElementById("upload");
input.onchange = function(e){
    video.src = URL.createObjectURL(this.files[0]);
    video.play();    
}
