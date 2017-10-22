var video = document.getElementById('player');   
var input = document.getElementById("upload");
input.onchange = function(e){
    video.src = URL.createObjectURL(this.files[0]);
    video.play();    
}


$('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left',
      closeOnClick: true, 
      draggable: true,
      onOpen: function(el) { /* Do Stuff */ }, 
      onClose: function(el) { /* Do Stuff */ },
    }
);