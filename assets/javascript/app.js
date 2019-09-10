// Initial array of shows
shows = ["Friends", "Game of Thrones", "Modern Family", "Psych", "Beat Bobby Flay"];

// displayGifs function displays "numGifs" amount of "show" gifs with their respective ratings
function displayGifs() {

    var show = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=HRrMbCNwCHClP2xPAixFjjvPSkGL784T"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });

}

// Function for re-rendering default and user-initialized buttons
function renderButtons() {

    $("#buttons-view").empty();
    for (var i = 0; i < shows.length; i++) {
        var btn = $("<button>");
        btn.addClass("show");
        btn.attr("data-name", shows[i]);
        btn.text(shows[i]);
        $("#buttons-view").append(btn);
    }
}

$("#add-show").on("click", function(event) {
    event.preventDefault();
    var show = $("#show-input").val()
    shows.push(show);
    renderButtons();
});

$(document).on("click", ".show", displayGifs);
renderButtons();

