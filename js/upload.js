var img = document.getElementById('pic');   
var input = document.getElementById("upload");
function makeBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

let imageMetaData;
input.onchange = function(e) {
    img.src = URL.createObjectURL(this.files[0]);

    let binaryString;
    const fr = new FileReader();
    fr.readAsDataURL(this.files[0]);
    fr.onloadend = () => {
        binaryString = fr.result;

        $.ajax({
            url: `${AZURE_URL}/analyze?${$.param({ visualFeatures: 'Categories,Description,Color' })}`,
            contentType: false,
            processData: false,
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/octet-stream');
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", AZURE_KEY_1);
            },
            type: 'POST',
            data: makeBlob(binaryString),
            success: (result) => {
                imageMetaData = result;
            },
            error: (e) => console.error(e)
        });  
    };  
};

$('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left',
      closeOnClick: true, 
      draggable: true,
    }
);