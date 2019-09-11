// How many Gifs to display in the #gifs-view
var numGifs = 10;

// Initial array of shows
shows = ["Friends", "Game of Thrones", "Modern Family", "Psych", "The Office"];

// Initializes another user-created show button
$("#add-show").on("click", function (event) {
    event.preventDefault();
    var show = $("#show-input").val()
    shows.push(show);
    renderButtons();
});

// Function for re-rendering default and user-initialized buttons
function renderButtons() {

    $("#buttons-view").empty();
    for (var i = 0; i < shows.length; i++) {
        var $btn = $("<button>").addClass("show");
        $btn.text(shows[i]).attr("data-name", shows[i]);
        $("#buttons-view").append($btn);
    }
}

// displayGifs function displays "numGifs" amount of "show" gifs with their respective ratings
function displayGifs() {
    const $gifs = $('<div>')
    var show = $(this).attr("data-name");
    var queryURL = `http://api.giphy.com/v1/gifs/search?q=${show}&api_key=HRrMbCNwCHClP2xPAixFjjvPSkGL784T&limit=${numGifs}`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        response.data.forEach(gif => {
            const $gif = $('<img>').addClass('img-fluid');
            $gif.attr("play", gif.images.original.url).attr("stop", gif.images.original_still.url);
            $gif.attr('src', $($gif).attr('stop'));
            $gifs.append($gif);
        });
        $('#gifs-view').html($gifs);
    });
}

// Plays and Pauses Gif
function toggleGif() {
    if ($(this).attr('src') === $(this).attr('stop')) {
        $(this).attr('src', $(this).attr('play'));
    }else{
        $(this).attr('src', $(this).attr('stop'));
    }
}


renderButtons();
$(document).on("click", ".show", displayGifs);
$(document).on("click", "img", toggleGif);


