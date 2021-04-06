var streamingResultsDiv = document.querySelector("#streatming-results-div");
var searchButton = document.querySelector("#search-button");
var searchField = document.querySelector("#search-field");
var movieDetailsDiv = document.querySelector("#movie-details-div");
var movieName = "";


function displayMovieData(movieId, movieDetails, whereItsStreaming) {
    console.log("Movie Details", movieDetails);
    var originalTitleEl = document.createElement("h1");
    console.log("Original Title = " + movieDetails.title);

    originalTitleEl.innerHTML = "Title: " + movieDetails.title;
    movieDetailsDiv.appendChild(originalTitleEl);
    var moviePosterEl = document.createElement("img");
    moviePosterEl.src = "https://image.tmdb.org/t/p/w500" + movieDetails.poster_path;
    movieDetailsDiv.appendChild(moviePosterEl);

    // display where's it's streaming
    console.log("Where it's Streaming: ", whereItsStreaming);
    // console.log("Where It's Streaming Results US", whereItsStreaming.results.US.flatrate);
    for (var i = 0; i < whereItsStreaming.results.US.flatrate.length; i++) {
        var streamingProviderEl = document.createElement("p");
        streamingProviderEl.textContent = whereItsStreaming.results.US.flatrate[i].provider_name;
        movieDetailsDiv.appendChild(streamingProviderEl);
        var streamingProviderLogoEl = document.createElement("img");
        streamingProviderLogoEl.src = "https://image.tmdb.org/t/p/w500" + whereItsStreaming.results.US.flatrate[i].logo_path;
        movieDetailsDiv.appendChild(streamingProviderLogoEl);
    }
}



function getWhereItsStreaming(movieID, movieDetails, ) {
    var tmdbAPIKey = "8e8357c629a4f6e188b08411c96a6e5b";
    var apiURL = "https://api.themoviedb.org/3/movie/" + movieID + "/watch/providers" + "?api_key=" + tmdbAPIKey;

    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // console.log(data);   
                displayMovieData(movieID, movieDetails, data)
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to OpenWeather API for Forecast');
    });
};



function getMoreMovieDetail(movieID) {
    var tmdbAPIKey = "8e8357c629a4f6e188b08411c96a6e5b";
    var apiURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + tmdbAPIKey + "&language=en-US"

    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                getWhereItsStreaming(movieID, data);
             });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to OpenWeather API for Forecast');
    });
};



function fetchFirstAPI(movieName) {
    var tmdbAPIKey = "8e8357c629a4f6e188b08411c96a6e5b";
    // var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + appID;
    // var apiURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=star+trek&api-key=T0ekj9kvOB8SEbBSMMEGhVwG8wou6TDU"

    // var apiURL = "https://api.themoviedb.org/3/search/movie?api_key=8e8357c629a4f6e188b08411c96a6e5b&language=en-US&page=1&include_adult=false&query=star+trek";
    var apiURL =  "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbAPIKey + "&language=en-US&page=1&include_adult=false&query=" + movieName;
    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                var movieID = data.results[0].id;
                getMoreMovieDetail(movieID);

                // displayMovieData(data, movieName);
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

searchButton.addEventListener("click", searchFormHandler);