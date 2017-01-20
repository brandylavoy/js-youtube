var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search'

function getDataFromApi(searchTerm, callback) {
    var query = {
        q: searchTerm,
        part: 'snippet',
        key: 'AIzaSyBN6Jot6qMwqCyJT0Ulk__wIs7tcqhqBas'
    }
    $.getJSON(YOUTUBE_BASE_URL, query, callback);
}

function displayYouTubeSearchData(data) {
    //console.log(data);
    var resultElement = '';
    //succefull
    if (data.items) {
        data.items.forEach(function (item) {
            console.log(item);
            resultElement += '<p>' + item.snippet.title + '</p>';
            resultElement += '<a href="https://www.youtube.com/watch?v=' + item.id.videoId + '">';
            resultElement += '<img src = "' + item.snippet.thumbnails.default.url + '"/>';
            resultElement += '</a>';
            resultElement += '<p>' + item.snippet.description + '</p>';

        });
    }
    //failure
    else {
        resultElement += '<p>No results</p>';
    }
    //showing the results
    $('.js-search-results').html(resultElement);

}

function watchSubmit() {
    $('.js-search-form').submit(function (e) {
        e.preventDefault();
        var query = $(this).find('.js-query').val();
        getDataFromApi(query, displayYouTubeSearchData);
    });
}

$(watchSubmit());
