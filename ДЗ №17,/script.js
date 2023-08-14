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


  function addMovieToFavorites() {
    const movieInput = document.getElementById('movie-title');
    const movieName = movieInput.value;
  
    // Очищаем введенное значение
    movieInput.value = '';
  
    // Формируем URL для запроса к OMDb API
    const apiKey = 'fb0d6426';
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieName)}`;
  
    // Отправляем GET запрос к OMDb API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'True') {
          const movie = {
            title: data.Title,
            year: data.Year,
            genre: data.Genre
          };
  
          // Добавляем фильм в список избранного
          const favoritesList = document.getElementById('favoritesList');
          const movieItem = document.createElement('li');
          movieItem.textContent = `${movie.title} (${movie.year}) - ${movie.genre}`;
          favoritesList.appendChild(movieItem);
        } else {
          alert('Фильм не найден');
        }
      })
      .catch(error => console.log(error));
  }
  

  
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