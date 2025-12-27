import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/styles.css';
import logoImage from './assets/images/logo.jpg';
import footerLogo from './assets/images/logo.jpg';
import navLogo from './assets/images/logo.jpg';
import favImage from './assets/images/favicon.svg';
import serviceImage from './assets/images/service-banner.jpg';
import footerImage from './assets/images/footer-bottom-img.png';
import MovieController from './js/movie';
import MovieSearch from './js/search';

$('#logo').attr("src", logoImage);
$('#logo2').attr("src", footerLogo);
$('#logo3').attr("src", navLogo);
$('.footer-bottom-img').attr("src", footerImage);
$('link').attr("href", favImage);
$('#service').attr("src", serviceImage);
$(document).ready(function () {
  const navOpenBtn = $("[data-menu-open-btn]");
  const navCloseBtn = $("[data-menu-close-btn]");
  const navbar = $("[data-navbar]");
  const overlay = $("[data-overlay]");
  const header = $("[data-header]");
  const goTopBtn = $("[data-go-top]");

  const navElemArr = [navOpenBtn, navCloseBtn, overlay];

  for (let i = 0; i < navElemArr.length; i++) {
    navElemArr[i].on("click", function () {
      navbar.toggleClass("active");
      overlay.toggleClass("active");
      $("body").toggleClass("active");
    });
  }

  $(window).on("scroll", function () {
    if (window.scrollY >= 10) {
      header.addClass("active");
    } else {
      header.removeClass("active");
    }

    if (window.scrollY >= 500) {
      goTopBtn.addClass("active");
    } else {
      goTopBtn.removeClass("active");
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    if(movieId)
    {
    MovieController.getMovieById(
      movieId,
      function (data) {
        $('.detail-title').text(data.title);
        $('.release-date time').text(data.release_date);
        $('.storyline').text(data.overview);
        $('.rating h4').text(data.vote_average);
        $('.movie-detail-banner img').attr('src', `https://image.tmdb.org/t/p/w500${data.poster_path}`);
      },
      function (error) {
        console.error(error);
      }
    );
    }
  });
  
  MovieController.getMovie(
    function (response) {
      const movies = response.results;
     
      const movieList = $(".movies-list");

      movies.forEach((movie, index) => {
        const movieCard = movieList.find("li").eq(index);
        const titleElement = movieCard.find(".card-title");
        const releaseYearElement = movieCard.find("time");
        const ratingElement = movieCard.find(".rating");
        const posterElement = movieCard.find(".card-banner img");
        const movieIdElement = movieCard.find(".movieId")
        movieIdElement.attr("href", `./movie-details.html?id=${movie.id}`)
        titleElement.text(movie.title);
        releaseYearElement.text(movie.release_date.split("-")[0]);
        ratingElement.find("data").text(movie.vote_average);
        posterElement.attr("src", `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
      });
    },
    function (error) {
      console.error("Error fetching movie data:", error);
    });

  MovieController.getTopMovies(
    function (response) {
      const topMovies = response.results;
      const topMovieList = $(".topMovies-list");

      topMovies.forEach((topMovies, index) => {
        const topMovieCard = topMovieList.find("li").eq(index);
        const titleElement = topMovieCard.find(".card-title");
        const releaseYearElement = topMovieCard.find("time");
        const ratingElement = topMovieCard.find(".rating");
        const posterElement = topMovieCard.find(".card-banner img");

        titleElement.text(topMovies.title);
        releaseYearElement.text(topMovies.release_date.split("-")[0]);
        ratingElement.find("data").text(topMovies.vote_average);
        posterElement.attr("src", `https://image.tmdb.org/t/p/w500${topMovies.poster_path}`);
      });
    },
    function (error) {
      console.error("Error fetching movie data:", error);
    });

  MovieController.getTvSeries(
    function (response) {
      const series = response.results;
      const seriesList = $(".tv-list");

      series.forEach((series, index) => {
        const seriesCard = seriesList.find("li").eq(index);
        const titleElement = seriesCard.find(".card-title");
        const releaseDateElement = seriesCard.find("time");
        const ratingElement = seriesCard.find(".rating data");
        const posterElement = seriesCard.find(".card-banner img");

        titleElement.text(series.name);
        releaseDateElement.text(series.first_air_date);
        ratingElement.text(series.vote_average);
        posterElement.attr("src", `https://image.tmdb.org/t/p/w500${series.poster_path}`);
      });
    },
    function (error) {
      console.error("Error fetching TV series data:", error);
    }
  );

  $("#search-btn").click(function () {
    let movieName = $("#movie-name").val();
    MovieSearch.fetchMovieData(
      function (data) {
        if (data.Response == "True") {
          $("#poster").attr("src", data.Poster);
          $("#title").text(data.Title);
          $("#imdbRating").text(data.imdbRating);
          $("#rated").text(data.Rated);
          $("#year").text(data.Year);
          $("#runtime").text(data.Runtime);
          $("#genre div").text(data.Genre.split(","));
          $("#plot").text(data.Plot);
          $("#actors").text(data.Actors);
        } else {
          $("#result").html(`<h3 class='msg'>${data.Error}</h3>`);
        }
      },
      function (error) {
        $("#result").html(`<h3 class="msg">${error}</h3>`);
      },
      movieName
    );
  });
});