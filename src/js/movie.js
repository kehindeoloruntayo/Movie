export default class MovieController {
    static getMovie(successCallback, errorCallback) {
        let request = new XMLHttpRequest();
        const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.MOVIE_KEY}&page=1`;
        request.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                const response = JSON.parse(this.responseText);
                successCallback(response);
            } else {
                console.error('TMDb API request failed:', this.status, this.statusText);
                errorCallback('Failed to fetch movie data from TMDb.');
            }
        };
        request.open("GET", url, true);
        request.send();
    }

    static getTopMovies(successCallback, errorCallback) {
        let request = new XMLHttpRequest();
        const topurl = `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=${process.env.MOVIE_KEY}&page=1`;
        request.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                const response = JSON.parse(this.responseText);
                successCallback(response);
            }  else {
                console.error('TMDb API request failed:', this.status, this.statusText);
                errorCallback('Failed to fetch top rated movie data from TMDb.');
            }
        };

        request.open("GET", topurl, true);
        request.send();
    }

    static getTvSeries(successCallback, errorCallback) {
        let request = new XMLHttpRequest();
        const tvurl = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=${process.env.MOVIE_KEY}&page=1`;
        request.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                const response = JSON.parse(this.responseText);
                successCallback(response);
            }  else {
                console.error('TMDb TV series API request failed:', this.status, this.statusText);
                errorCallback('Failed to fetch TV series data from TMDb.');
            }
        };

        request.open("GET", tvurl, true);
        request.send();
    }

    static getMovieById(movieId, successCallback, errorCallback) {
        let request = new XMLHttpRequest();
        const idurl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOVIE_KEY}`;
        request.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                const response = JSON.parse(this.responseText);
                successCallback(response);
            } else {
                console.error('TMDb API request failed:', this.status, this.statusText);
                errorCallback('Failed to fetch movie data from TMDb.');
            }
        };

        request.open("GET", idurl, true);
        request.send();
    }
} 