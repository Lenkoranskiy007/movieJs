
const API_KEY = '408e3df2-1ec5-416a-9c91-b340bd84c2ba'
const API_URL_TOP = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1'
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

getMovies(API_URL_TOP)

 
async function getMovies (url) {
   
  const response  = await axios.get(url, {
    headers: {
      'Content-type': 'application/json',
      'X-API-KEY': API_KEY
    }
  }).then( res => res.data)

  console.log(response)
  setMovies(response)

}

function setMovies(movieData) {
  const movies = document.querySelector('.movies')
  movies.innerHTML = ''
  movieData.films.map(item => {
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
    <div class="movie__info__category">${item.genres.map(genres => genres.genre)}</div>
    ${item.rating && `<div class="movie__info__average movie__info__average__${getByClass(item.rating)}">${item.rating}</div> `}
    <div class="movie__info__year">${item.year}</div>

    </div>
    `
    movies.appendChild(movie)
    return item
  })
}

function getByClass(rating) {
  if (rating >= 7) {
    return 'green'
  } else if (rating >= 5)  {
    return 'orange'
  } else {
    return 'red'
  }
}


const form = document.querySelector('form')
const input  = document.querySelector('.header__content__search')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchData = `${API_URL_SEARCH}${input.value}`
  if (input.value)  {
    getMovies(searchData)
  }


})



