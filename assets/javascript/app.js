var Animals = ["lion",'tiger','tear','monkey','baboon','falcon','eagle'];

function addAnimalButton(input){
    if(Array.isArray(input)){
        for(i=0;i<input.length;i++){
            console.log(input[i]);
            var button = $("<button>").addClass("button animalButton").attr("animal",input[i]).append(capitalizeWord(input[i]));
            $("#buttonColumn").append(button);
        }
    }else{//single string input
        var button = $("<button>").addClass("button animalButton").attr("animal",input).append(capitalizeWord(input));
        $("#buttonColumn").prepend(button);
    }
}

$(document).ready(function(){
    addAnimalButton(Animals);
});

$("#inputButton").on("click",function(event){
    event.preventDefault();

    var newInput = $("#inputText").val().trim().toLowerCase();
    console.log(newInput + "" + newInput.length);
    if(newInput.length === 0){
        showErrorMessage("Please enter an animal");
    }else if(Animals.indexOf(newInput) != -1){
        showErrorMessage(capitalizeWord(newInput) + " is already listed");
    }else{
        addAnimalButton(newInput);
        Animals.push(newInput);
    }

});

function capitalizeWord(input){
    input = input.trim().toLowerCase();
    var result = "";
    if(input.indexOf(" ") != -1){
        var wordArray = input.split(" ");
        for(i=0;i<wordArray.length;i++){
            result += capitalizeWord(wordArray[i]) + " ";
        }
        result = result.trim();
    }else{
        result = input.charAt(0).toUpperCase() + input.slice(1);
    }
    return result;
}

function showErrorMessage(message){
    $("#errorMessage").html(message);
    $("#errorMessage").show();

    setTimeout(function(){$("#errorMessage").hide();},3000);

}