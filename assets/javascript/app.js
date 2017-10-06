var Animals = ["lion",'tiger','tear','monkey','baboon','falcon','eagle'];
var apiKey = "&api_key=v1L089wZ77BhklsEz4QtcWxolRecN4B3";
var queryURL = "https://api.giphy.com/v1/stickers/search?";
const queryLimit = 10;
const DEBUG = true;

function log(input){
    if(DEBUG) console.log(input);
}

function addAnimalButton(input){
    if(Array.isArray(input)){
        for(i=0;i<input.length;i++){
            console.log(input[i]);
            var button = $("<button>").addClass("button animalButton").attr("animal",input[i]).append(capitalizeWord(input[i]));

            button.bind("click", function(){
                
                        $.ajax({
                            url:queryURL + "q=" + $(this).attr("animal").replace(" ","+") + "&limit=" + queryLimit.toString() + apiKey,
                            method:"GET"
                        }).done(function(response){
                            log(this.url);
                            log(response);
                            var results = response.data;
                            $(".imagesArea").empty();
                            for(i=0;i<results.length;i++){
                                var gifDiv = $("<div class='image'>");
                                var p = $("<p>").html("Rating: " + results[i].rating).attr("margin","10px");                
                                var image = $("<img>").attr("src",results[i].images.fixed_height_still.url).attr("image-state","still");
                                image.attr("still-source", results[i].images.fixed_height_still.url);
                                image.attr("moving-source", results[i].images.fixed_height.url);
                
                
                                gifDiv.append(image).prepend(p);
                
                                image.bind("click",function(){
                                  if($(this).attr("image-state") == "still"){
                                    $(this).attr("src", $(this).attr("moving-source")).attr("image-state","moving");
                                  }else{
                                    $(this).attr("src", $(this).attr("still-source")).attr("image-state","still");
                                  }
                                })
                
                
                                $(".imagesArea").append(gifDiv);
                            }
                
                        });
                
                
                    });

            $("#buttonColumn").append(button);
        }
    }else{//single string input
        var button = $("<button>").addClass("button animalButton").attr("animal",input).append(capitalizeWord(input));
        button.bind("click", function(){
            
                    $.ajax({
                        url:queryURL + "q=" + $(this).attr("animal").replace(" ","+") + "&limit=" + queryLimit.toString() + apiKey,
                        method:"GET"
                    }).done(function(response){
                        log(this.url);
                        log(response);
                        var results = response.data;
                        $(".imagesArea").empty();
                        for(i=0;i<results.length;i++){
                            var gifDiv = $("<div class='image'>");
                            var p = $("<p>").html("Rating: " + results[i].rating).attr("margin","10px");                
                            var image = $("<img>").attr("src",results[i].images.fixed_height_still.url).attr("image-state","still");
                            image.attr("still-source", results[i].images.fixed_height_still.url);
                            image.attr("moving-source", results[i].images.fixed_height.url);
            
            
                            gifDiv.append(image).prepend(p);
            
                            image.bind("click",function(){
                              if($(this).attr("image-state") == "still"){
                                $(this).attr("src", $(this).attr("moving-source")).attr("image-state","moving");
                              }else{
                                $(this).attr("src", $(this).attr("still-source")).attr("image-state","still");
                              }
                            })
            
            
                            $(".imagesArea").append(gifDiv);
                        }
            
                    });
            
            
                });

        $("#buttonColumn").prepend(button);
    }
}

$(document).ready(function(){
    addAnimalButton(Animals);
});

$("#inputButton").on("click",function(event){
    event.preventDefault();

    var newInput = $("#inputText").val().trim().toLowerCase();
    this.form.reset();
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

$(document).ready(function(){
    
});