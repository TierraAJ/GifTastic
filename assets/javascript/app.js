// Initial array of animals
var animalType = ["panda", "tiger", "kitten", "puppy"];

// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

  var animalType = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=oEC0tiZKmdVJKD4Zg3BWI0B0IYogrEHi&q=animal+baby+" + animalType + "&limit=6&offset=0&rating=G&lang=en";
  
  console.log(animalType);

  // Creating an AJAX call for the specific animal button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  
  // After the data from the AJAX request comes back
  .then(function(response) {
  
  console.log(response);

  $("#animals-view").empty();
  
  var arrayResult = response.data;

  console.log(arrayResult);

  for (var i = 0; i < arrayResult.length; i++){

      // Creating a div to hold the animal type
      var animalDiv = $("<div>");        

      // Saving the image_original_url property
      var stillImgURL = arrayResult[i].images.fixed_height_still.url;
      var animatedImgURL = arrayResult[i].images.fixed_height.url;

      // Creating and storing an image tag
      var image = $("<img class='animal'>");
      
      // Setting the catImage src attribute to imageUrl
      image.attr("src", stillImgURL);
      image.attr("alt", "image");

      image.attr("data-still-img", stillImgURL);
      image.attr("data-animated-img", animatedImgURL);
      image.attr("data-state", "still");

      // Appending the image
      animalDiv.append(image);

      // Putting the entire animal type above the previous animal types
      $("#animals-view").prepend(animalDiv);
  }
  });

}

// Function for displaying animal data
function renderButtons() {

  // Deleting the animals prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < animalType.length; i++) {

    // Then dynamicaly generating buttons for each animal in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of animal-btn to our button
    a.addClass("animal-btn");
    // Adding a data-attribute
    a.attr("data-name", animalType[i]);
    // Providing the initial button text
    a.text(animalType[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a animal button is clicked
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding animal from the textbox to our array
  animalType.push(animal);

  $("#animal-input").val("");

  // Calling renderButtons which handles the processing of our animal array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);

$(document).on("click", ".animal", function() {
    var imgState = $(this).attr("data-state");

    if (imgState == "still"){
        var animatedState = $(this).attr("data-animated-img");
        $(this).attr("src", animatedState);
        $(this).attr("data-state", "animated");
    }
    else {
      var stillState = $(this).attr("data-still-img");
        $(this).attr("src", stillState);
        $(this).attr("data-state", "still");
    }
});

// Calling the renderButtons function to display the intial buttons
renderButtons();