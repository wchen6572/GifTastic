
$(document).ready(function() {
    var topics = ["Dog", "Cat"];

    function renderButtons(){
        $("#gif-view").empty();

        for (i=0; i<topics.length; i++){
            var btn = $("<button>");
            btn.addClass("gifs");
            btn.attr("gif-name", topics[i]);
            btn.text(topics[i]);
            $("#gif-view").append(btn);
            // console.log ("HELLO");
            
        }
    }

    function displayGif(){

        var gif = $(this).attr("gif-name");
        var apiKey = "mJ2ciLZg7WQFPFtBX9pQK6yg6hTDhW4k";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + apiKey;
        

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
                // console.log(queryURL);
      
                // console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;
      
                // Looping through each result item
                for (var i = 0; i < results.length; i++) {
      
                  // Creating and storing a div tag
                  var animalDiv = $("<div>");
      
                  // Creating a paragraph tag with the result item's rating
                  var p = $("<p>").text("Rating: " + results[i].rating);
      
                  // Creating and storing an image tag
                  var animalImage = $("<img>");
                  // Setting the src attribute of the image to a property pulled off the result item
                  animalImage.attr("src", results[i].images.fixed_height_still.url);
                  animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                  animalImage.attr("data-animate",results[i].images.fixed_height.url )                  
                  animalImage.attr("data-state", "still");
                  animalImage.addClass("onScreengifs");
      
                  // Appending the paragraph and image tag to the animalDiv
                  animalDiv.append(p);
                  animalDiv.append(animalImage);
      
                  // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                  $("#gifs-view").prepend(animalDiv);

                }
            });

    }

    function startStopgifs (){
        var state = $(this).attr("data-state");
        console.log("Image Triggered")
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        

    }

    

    $("#add-gif").on('click', function(event){
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        topics.push(gif);
        console.log("i've been clicked");
        renderButtons();

    });



    $(document).on("click", ".gifs", displayGif);
    $(document).on("click", ".onScreengifs", startStopgifs);


    renderButtons();
});



