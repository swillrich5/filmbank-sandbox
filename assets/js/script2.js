var streamingResultsDiv = document.querySelector("#streatming-results-div");
var searchButton = document.querySelector("#search-button");
var movieName = "";






function fetchFirstAPI(movieName) {
    // var tmdbAPIKey = "8e8357c629a4f6e188b08411c96a6e5b";
    // var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + appID;
    var apiURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=star+trek&api-key=T0ekj9kvOB8SEbBSMMEGhVwG8wou6TDU"

    // var apiURL = "https://api.themoviedb.org/3/search/movie?api_key=8e8357c629a4f6e188b08411c96a6e5b&language=en-US&page=1&include_adult=false&query=star+trek";
    // var apiURL =  "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbAPIKey + "&language=en-US&page=1&include_adult=false&query=" + movieName;
    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to OpenWeather API for Current Weather');
    });
};


var searchFormHandler = function(event) {
    event.preventDefault();
    movieName = searchField.value;
    console.log(movieName);
    movieName = movieName.replace(/ /g, '+');
    console.log(movieName);
    console.log("Movie Name =" + movieName);
    if (movieName) {
        fetchFirstAPI(movieName);
        // cityNameEl.value = '';

    } else {
        alert('Please enter a movie name');
    }
}

searchButton.addEventListener("click", fetchFirstAPI);