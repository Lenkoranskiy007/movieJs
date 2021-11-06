// const axios = require('axios')

const API_KEY = '408e3df2-1ec5-416a-9c91-b340bd84c2ba'

const movieFunc = async () => {
  const response = await axios.get('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1', {
  headers: {
    'X-API-KEY': API_KEY
  }
  })
  movieData(response.data)
  console.log(response.data)
 
}
movieFunc()




function getByClass (rating) {
  if (rating >= 7) {
    return 'green'
  } else if (rating >= 5) {
     return 'orange'
  } else  {
    return 'red'
  }
}

const movieData = (data) => {
  const movies = document.querySelector('.movies')

   data.films.map(item => {
    const movie = document.createElement('div')
    movie.classList.add('movie')
     movie.innerHTML = `
    <div class="movie__cover__inner">
    <img
      src="${item.posterUrlPreview}"
      alt="${item.posterUrlPreview}"
      class="movie__cover"
    />
    <div class="movie__cover__darkened"></div>
  </div>
  <div class="movie__info">
    <div class="movie__info__title">${item.nameRu}</div>
    <div class="movie__info__category">${item.genres.map(genres =>  genres.genre + ' ')}</div>
    <div class="movie__info__average movie__info__average__${getByClass(item.rating)}">${item.rating}</div>
  </div>
    
    `
    movies.appendChild(movie)
    return item
    

  })
}

