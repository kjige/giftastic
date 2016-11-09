var topics = ['bird', 'dog', 'cat'];
var q = "";
var queryUrl = "";
var resp;
makeButtons();
topicButtonClick();

function makeButtons() {
    for (var i = 0; i < topics.length; i++) {
        var b = $('<button class="btn">');
        b.html(topics[i]);
        b.attr({
            'class': 'btn topicButton',
            'data-search': topics[i]
        });
        $('.buttons').append(b);
    }
}

function topicButtonClick() {
    $(document).on('click', '.topicButton', function () {
        q = $(this).data('search');
        queryUrl = 'http://api.giphy.com/v1/gifs/search?q=' + q + '&api_key=dc6zaTOxFJmzC&limit=10';
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).done(function (response) {
            resp = response;
            console.log(resp);
            console.log(q);
            displayGifs();
        });
    });
}

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
    // resp = "";
}

function gifButtonClick() {
    $(document).on('click', '.gifBtn', function () {
        var n = $(this).data('number');
    });
}