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
    $("#moderate-prediction").text("");
    $("#severe-prediction").text("");
});

$("#predict-button").click(function(event){
    let message = {
        image: base64Image
    }
    console.log(message);
    $.post("https://d-cnn-retina.herokuapp.com/predict", JSON.stringify(message),function(response){
        console.log(response);

        $("#normal-prediction").text(response.prediction.Normal.toFixed(6));
        $("#moderate-prediction").text(response.prediction.Moderate.toFixed(6));
        $("#severe-prediction").text(response.prediction.Severe.toFixed(6));
        
        let result = 0;
        if(response.prediction.Normal >= 0.5){
            result +=1;
        }
       if(response.prediction.Moderate >= 0.5){
            result +=1;
        }
        if(response.prediction.Severe >=0.5){
            result +=1;
        }

        if(result===1){
            $("#result-prediction").text("NORMAL");

        }
        else if(result===2){
            $("#result-prediction").text("MODERATE");

        }
        else{
            $("#result-prediction").text("SEVERE");

        }
        // console.log(`maxValue : ${maxValue}`);
        console.log(result);
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