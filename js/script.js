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
  console.log(results);
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  await getAPIKey();
  const API_KEY = global.API_KEY;
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();

  return data;
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
      console.log('Shows');
      break;
    case 'movie-details.html':
      console.log('Movie Details');
      break;
    case 'tv-details.html':
      console.log('TV Details');
      break;
    case 'search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
