
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

  setMovies(response)
  createMovieModal(response.films)
  

}

function setMovies(movieData) {
  const movies = document.querySelector('.movies')
  movies.innerHTML = ''
  movieData.films.map(item => {
    const movie = document.createElement('div')
    movie.classList.add('movie')
    movie.innerHTML = `
    <div class="movie__cover__inner" >
    <img
    src="${item.posterUrlPreview}"
    alt="${item.posterUrlPreview}"
    class="movie__cover"
  />
   
    <div class="movie__cover__darkened" data-id="${item.filmId}"></div>
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
const input  = document.querySelector('.form__input')


form.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchData = `${API_URL_SEARCH}${input.value}`
  if (input.value)  {
    getMovies(searchData)
  }

})

const items = document.querySelectorAll('.pagination li')
 for (let item of items) {
    item.addEventListener('click', function () {
      let pageNum = +this.innerHTML     
      let url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${pageNum}`
      getMovies(url)
    })
 }

 const logo = document.getElementById('logo')
 logo.addEventListener('click', event => {
   const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1`
   getMovies(url)
 })


function createModal (options) {
  const popup = document.createElement('div')
  popup.classList.add('popup')
  popup.insertAdjacentHTML('afterbegin',   
  ` <div class="popup__container" data-popup="popup">
  <div class="popup__body" data-body="body">
    <img src="" alt="" />
    <div class="movie__info">
      <div class="movie__info__title">""</div>
      <div class="movie__info__category">""</div>
      <div class="movie__info__average">""</div>
      <div class="movie__info__year">""</div>
    </div>
    <div class="popup__close" data-close="close">&#10006</div>
  </div>
</div>
`)
  document.body.appendChild(popup)
  return popup

}


$.modal = function (options) {

  const $modal = createModal(options)

  return {
    open() {
      $modal.classList.add('active')
    },

    close () {
      console.log('close')
      $modal.classList.remove('active')

    },
    setContent (html) {

        $modal.querySelector('[data-body]').innerHTML = html
        
      },
    
  }
}
const modal = $.modal()




function createMovieModal(movieData) {
  document.addEventListener('click', event => {
    event.preventDefault()
    const id = +event.target.dataset.id
    const movie = movieData.find(f => f.filmId === id)
    console.log(id, movie)
    modal.setContent(`
    <img class="modal_img" src="${movie.posterUrlPreview}" alt="${movie.posterUrlPreview}" />
    <div class="movie__info">
      <div class="movie__info__title">""</div>
      <div class="movie__info__category">""</div>
      <div class="movie__info__average">""</div>
      <div class="movie__info__year">""</div>
    </div>
    `)
    modal.open()
    
  })
}



document.addEventListener('click', event => {
  if (event.target.dataset.close ) {
    modal.close()
  }
})


document.addEventListener('click', event => {
  if (event.target.dataset.popup ) {
    modal.close()
  }
})

document.addEventListener('click', event => {
  if (event.target.dataset.body ) {
  console.log(true)
  }
})
















