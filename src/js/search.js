import '../css/search.css';

export default class MovieSearch {
    static fetchMovieData(successCallback, errorCallback, movieName) {
        let request = new XMLHttpRequest();
        const searchurl = `http://www.omdbapi.com/?t=${movieName}&apikey=${process.env.SEARCH_KEY}`;

        request.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const response = JSON.parse(this.responseText);
                    successCallback(response);
                } else {
                    console.error('API request failed:', this.status, this.statusText);
                    errorCallback('Failed to fetch movie data from the API.');
                }
            }
        };

        request.open("GET", searchurl, true);
        request.send();
    }
}