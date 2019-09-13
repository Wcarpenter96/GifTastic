// How many Gifs to display in the #gifs-view
var numGifs = 10;
// Initial array of shows
shows = ["Friends", "Game of Thrones", "Modern Family", "Psych", "The Office"];
var gifsArr = [];
var playArr = [];
var stopArr = [];
var ratingArr = [];

if (localStorage.getItem('play') !== null)
    loadFavoriteGifs();

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
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${show}&api_key=HRrMbCNwCHClP2xPAixFjjvPSkGL784T&limit=${numGifs}`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        response.data.forEach(gif => {
            const $gif = $('<div>').css('float', 'left').css('text-align', 'left');
            const $like = $('<button>').text('♥').addClass('gifBtn').attr("play", gif.images.original.url).attr("stop", gif.images.original_still.url).attr("rating", gif.rating.toUpperCase());
            const $rate = $('<h5>').text(gif.rating.toUpperCase())
            const $pic = $('<img>').addClass('img-fluid')
            $pic.attr("play", gif.images.original.url).attr("stop", gif.images.original_still.url);
            $pic.attr('src', $($pic).attr('stop'));
            $gif.append($pic, $rate, $like);
            $gifs.append($gif);
        });
        $('#gifs-view').html($gifs);
    });
}

// Plays and Pauses Gif
function toggleGif() {
    if ($(this).attr('src') === $(this).attr('stop')) {
        $(this).attr('src', $(this).attr('play'));
    } else {
        $(this).attr('src', $(this).attr('stop'));
    }
}

function loadFavoriteGifs() {
    playArr = JSON.parse(localStorage.getItem('play'));
    stopArr = JSON.parse(localStorage.getItem('stop'));
    ratingArr = JSON.parse(localStorage.getItem('rating'));
    $favs = $('<div>');
    for (let i = 0; i < playArr.length; i++) {
        const $gif = $('<div>').css('float', 'left').css('text-align', 'left');
        const $like = $('<button>').text('X').addClass('gifBtnFav').attr('index', i);
        const $rate = $('<h5>').text(ratingArr[i]);
        const $pic = $('<img>').addClass('img-fluid');
        $pic.attr("play", playArr[i]).attr("stop", stopArr[i]);
        $pic.attr('src', $($pic).attr('stop'));
        $gif.append($pic, $rate, $like);
        $favs.append($gif);
    }
    $('#favorites').html($favs);
}

function favoriteGif() {

    playArr.push($(this).attr('play'));
    stopArr.push($(this).attr('stop'));
    ratingArr.push($(this).attr('rating'));
    localStorage.setItem('play', JSON.stringify(playArr));
    localStorage.setItem('stop', JSON.stringify(stopArr));
    localStorage.setItem('rating', JSON.stringify(ratingArr));
    loadFavoriteGifs();
}

function unfavoriteGif() {
    playArr.splice($(this).attr('index'), 1);
    stopArr.splice($(this).attr('index'), 1);
    ratingArr.splice($(this).attr('index'), 1);
    localStorage.setItem('play', JSON.stringify(playArr));
    localStorage.setItem('stop', JSON.stringify(stopArr));
    localStorage.setItem('rating', JSON.stringify(ratingArr));
    loadFavoriteGifs();
}

renderButtons();
$(document).on("click", ".show", displayGifs);
$(document).on("click", "img", toggleGif);
$(document).on("click", ".gifBtn", favoriteGif);
$(document).on("click", ".gifBtnFav", unfavoriteGif);


