var topics = ['bird', 'dog', 'cat'];
var q = "";
var queryUrl = "";
var resp;
makeButtons();
makeNewButton();
topicButtonClick();
gifButtonClick();
// make buttons from array elements
function makeButtons() {
    for (var i = 0; i < topics.length; i++) {
        var b = $('<button class="btn">');
        b.html(topics[i]);
        b.attr({
            'class': 'btn topicButton topicButton' + i,
            'data-search': topics[i]
        });
        $('.buttons').append(b);
    }
}
// make a new button from input
function makeNewButton() {
    $(document).on('click', '.submitBtn', function () {
        var m = $('.userInput').val().trim();
        if (m === '') {
            return false;
        } else {
            topics.push(m);
            $('.buttons').empty();
            makeButtons();
        }
    });
}
// when topic button is clicked, do API call
function topicButtonClick() {
    $(document).on('click', '.topicButton', function () {
        q = $(this).data('search');
        queryUrl = 'https://api.giphy.com/v1/gifs/search?q=' + q + '&api_key=dc6zaTOxFJmzC&limit=10';
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).done(function (response) {
            resp = response;
            displayGifs();
        });
    });
}
// display gifs from API response
function displayGifs() {
    $('.gifs').empty();
    for (var i = 0; i < 10; i++) {
        var g = $('<img>').attr({
            'src': resp.data[i].images.fixed_height_still.url,
            'data-still': resp.data[i].images.fixed_height_still.url,
            'data-anim': resp.data[i].images.fixed_height.url,
            'data-type': 'still',
            'class': 'btn gifBtn'
        });
        $('.gifs').append(g);
    }
}
// when gif is clicked, switch between static and animated
function gifButtonClick() {
    $(document).on('click', '.gifBtn', function () {
        var d = $(this).attr('data-type');
        if (d === 'still') {
            $(this).attr('src', $(this).data('anim'));
            $(this).attr('data-type', 'anim');
            d = '';
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-type', 'still');
            d = '';
        }
    });
}