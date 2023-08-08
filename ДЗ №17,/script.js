document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault(); 
  
    let movieTitle = document.getElementById('movie-title').value;
  
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://www.omdbapi.com/?apikey=fb0d6426&t=' + encodeURIComponent(movieTitle));
  
    xhr.onload = function() {
      if (xhr.status === 200) {
        var movieData = JSON.parse(xhr.responseText);
        displayMovieInfo(movieData);
      } else {
        alert('Произошла ошибка при получении данных о фильме');
      }
    };
  
    xhr.send();
  });
  
  function displayMovieInfo(movieData) {
    var movieInfoContainer = document.getElementById('movie-info');
    movieInfoContainer.innerHTML = '';
  
    if (movieData.Response === 'False') {
      movieInfoContainer.innerHTML = 'Фильм не найден';
    } else {
      movieInfoContainer.innerHTML = `
        <h2>${movieData.Title}</h2>
        <p>Год выпуска: ${movieData.Year}</p>
        <p>Режиссер: ${movieData.Director}</p>
        <p>Актеры: ${movieData.Actors}</p>
        <p>Описание: ${movieData.Plot}</p>
        <img src="${movieData.Poster}" alt="${movieData.Title} постер">
      `;
    }
  
    movieInfoContainer.style.display = 'block';
  }