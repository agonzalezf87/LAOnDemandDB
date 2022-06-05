/*---------- Axios Instance ----------*/
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }
})

/*---------- Endpoints ----------*/

const URL_TrendingMovies = 'trending/movie/day'
const URL_MoviesGenres = 'genre/movie/list'
const URL_DiscoverMovie = 'discover/movie'
const URL_SearchMovie = '/search/movie'
const URL_Movie = '/movie'

/*---------- Helpers ----------*/

function renderMovies(container, movies) {
    container.innerHTML = ''
    movies.forEach(movie => {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`)

        movieContainer.onclick = () => location.hash = `#movie=${movie.id}`

        movieContainer.appendChild(movieImg)
        container.appendChild(movieContainer)
    })
}

function renderCategories(container, categories) {
    container.innerHTML = ''
    categories.forEach(category => {
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container')

        const categoryTitle = document.createElement('h3')
        categoryTitle.classList.add('category-title')

        categoryTitle.onclick = () => location.hash = `#category=${category.id}-${category.name.replace(' ', '_')}`

        categoryTitle.setAttribute('id', `id${category.id}`)
        const categoryTitleText = document.createTextNode(category.name)

        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)
        container.appendChild(categoryContainer)
    })
}

/*---------- API Calls ----------*/

async function getTrendingMoviesPreview() {
    const { data } = await api(URL_TrendingMovies)
    const movies = data.results

    renderMovies(trendingMoviesPreviewList, movies)
}

async function getTrendingMovies() {
    const { data } = await api(URL_TrendingMovies)
    const movies = data.results

    renderMovies(genericSection, movies)
}

async function getMoviesByCategory(id) {
    const { data } = await api(URL_DiscoverMovie,{
        params: {
            with_genres: id
        }
    })
    const movies = data.results

    renderMovies(genericSection, movies)
}

async function getMoviesBySearch(query) {
    const { data } = await api(URL_SearchMovie,{
        params: {
            query,
        }
    })
    const movies = data.results

    renderMovies(genericSection, movies)
}

async function getMovieById(id) {
    const { data: movie } = await api(`${URL_Movie}/${id}`)

    movieDetailTitle.textContent = movie.title
    movieDetailDescription.textContent = movie.overview
    movieDetailScore.textContent = movie.vote_average

    const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    headerSection.style.background = `
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%,
    rgba(0, 0, 0, 0) 29.17%),
    url(${movieImgUrl})
    `

    renderCategories(movieDetailCategoriesList, movie.genres)
    getRelatedMovies(id)
}

async function getCategoriesPreview() {
    const { data } = await api(URL_MoviesGenres)
    const categories = data.genres
    
    renderCategories(categoriesPreviewList, categories)
}

async function getRelatedMovies(id) {
    const { data } = await api(`${URL_Movie}/${id}/recommendations`)

    const relatedMovies = data.results

    renderMovies(relatedMoviesContainer, relatedMovies)
}