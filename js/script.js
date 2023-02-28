const global = {
  currentPage: getCurrentPageURL(),
};

async function getAPIKey() {
  const api_json = await fetch('./js/constants.json');
  const api_data = await api_json.json();
  const api_key = await api_data.key;
  const apiRes = Promise.resolve(api_key)
    .then((key) => {
      global.API_KEY = key;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `<img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
      class="card-img-top"
      alt="${movie.title}"
    />`
          : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>`;
    document.querySelector('#popular-movies').appendChild(div);
  });
}

async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="tv-details.html?id=${show.id}">
      ${
        show.poster_path
          ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />`
          : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"
    />`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">Air Date: ${show.first_air_date}</small>
      </p>
    </div>`;
    document.querySelector('#popular-shows').appendChild(div);
  });
}

async function displayMovieDetails() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="tv-details.html?id=${show.id}">
      ${
        show.poster_path
          ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />`
          : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"
    />`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">Air Date: ${show.first_air_date}</small>
      </p>
    </div>`;
    document.querySelector('#popular-shows').appendChild(div);
  });
}

async function displayShowDetails() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="tv-details.html?id=${show.id}">
      ${
        show.poster_path
          ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />`
          : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"
    />`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">Air Date: ${show.first_air_date}</small>
      </p>
    </div>`;
    document.querySelector('#popular-shows').appendChild(div);
  });
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  await getAPIKey();
  const API_KEY = global.API_KEY;
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();

  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

function getCurrentPageURL() {
  if (window.location.pathname.split('/')[2].toString() !== null) {
    return window.location.pathname.split('/')[2].toString();
  } else {
    console.log('Something went wrong getting global.currentPage.');
    return '';
  }
}

// Init app
function init() {
  console.log('global.currentPage: ', global.currentPage);
  switch (global.currentPage) {
    case '/':
    case 'index.html':
      displayPopularMovies();
      break;
    case 'shows.html':
      displayPopularShows();
      break;
    case 'movie-details.html':
      displayMovieDetails();
      console.log('Movie Details');
      break;
    case 'tv-details.html':
      displayShowDetails();
      console.log('TV Details');
      break;
    case 'search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
