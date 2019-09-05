    $(function(){   
        populateButtons(searchArray,'searchButton','#buttonsArea')
        console.log("Page loaded");
    })
// An array of animals, new animals will be pushed into this array;
    var searchArray = ['Dog', 'cat', 'goldfish', 'rabbit', 'hamster', 'skunk', 'Bird', 'frog', 'ferret', 'gerbil', 'chicken', 'lion', 'duck', 'camal', 'cow', 'goat', 'falcon', 'tiger', 'hyene', 'wolf', 'dolphin'];
// Creating Functions & Methods
// Function that displays all gif buttons
    function populateButtons(searchArray,classToAdd,areaToAddTo){
        $(areaToAddTo).empty();
        for(var i = 0; i < searchArray.length; i++){
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type',searchArray[i])
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
        }
    }
    $(document).on('click','.searchButton', function(){
        $("#searches").empty();
        var type = $(this).data('type');
        var queryURL='https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=DwtPCpy2hbN4JZp2e2kHpj6BPav1zNHc&limit=10';
    // Ajax call
    $.ajax({
       url:queryURL,
       method:'GET'
    }).done(function(response){
        for(var i = 0; i < response.data.length; i++){
        var searchDiv = $('<div class="search-item">');
        var rating = response.data[i].rating;
        var p= $("<p>").text("Rating: "+rating);
        var animated = response.data[i].images.fixed_height.url;
        var still = response.data[i].images.fixed_height_still.url;
        var image = $("<img>");
        image.attr("src",still);
        image.attr("data-still",still);
        image.attr("data-animated",animated);
        image.attr("data-state","still");
        image.addClass("searchImage");
        searchDiv.append(p);
        searchDiv.append(image);
        $("#searches").append(searchDiv);
       }
   })
    // Onclick function to animate/pause gifs
    $(document).on("click", ".searchImage", function() {
        var state = $(this).attr('data-state');
    // If state = still, on click will animate the gif
    if (state == 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
        }
    // Otherwise, if state != still, gif will pause on click
    else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
         }
    });
    })
    // New button created when field has a value entered and then cleared after confirming
    $("#addSearch").on("click", function(event){
        event.preventDefault();
        var newSearch = $("#search-input").val().trim();
        searchArray.push(newSearch);
        populateButtons(searchArray,"searchButton","#buttonsArea");
        return false; 
   
    })

