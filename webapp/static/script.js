let base64Image;
$("#image-selector").change(function(){
    let reader = new FileReader();
    reader.onload = function(e){
        let dataURL = reader.result;
        $("#selected-image").attr("src",dataURL);
        document.getElementById("result").style.visibility = "visible"; 
        base64Image = dataURL.replace("data:image/jpeg;base64,","");
        console.log(base64Image);
    }
    reader.readAsDataURL($("#image-selector")[0].files[0]);
    $("#normal-prediction").text("");
    $("#mild-prediction").text("");
    $("#moderate-prediction").text("");
    $("#severe-prediction").text("");
    $("#proliferative-prediction").text("");
});

$("#predict-button").click(function(event){
    let message = {
        image: base64Image
    }
    console.log(message);
    $.post("http://192.168.43.49:5000/predict", JSON.stringify(message),function(response){
        $("#normal-prediction").text(response.prediction.Normal.toFixed(6));
        $("#mild-prediction").text(response.prediction.Mild.toFixed(6));
        $("#moderate-prediction").text(response.prediction.Moderate.toFixed(6));
        $("#severe-prediction").text(response.prediction.Severe.toFixed(6));
        $("#proliferative-prediction").text(response.prediction.Proliferative.toFixed(6));
        let maxValue = Math.max(response.prediction.Normal,
                response.prediction.Mild,
                response.prediction.Moderate,
                response.prediction.Severe,
                response.prediction.Proliferative);
        let result;
        if(maxValue === response.prediction.Normal){
            result = 'Normal';
        }
        else if(maxValue === response.prediction.Mild){
            result = 'Mild';
        }
        else if(maxValue === response.prediction.Moderate){
            result = 'Moderate';
        }
        else if(maxValue === response.prediction.Severe){
            result = 'Severe'
        }
        else{
            result = 'Proliferative'
        }
        $("#result-prediction").text(result);
        console.log(`maxValue : ${maxValue}`);
        console.log(response);
    })

})

var modal = document.getElementById("popupInfo");

// Get the button that opens the modal
var btn = document.getElementById("info");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}