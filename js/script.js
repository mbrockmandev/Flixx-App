const global = {
  currentPage: getCurrentPageURL(),
};

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
      console.log('Home');
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
