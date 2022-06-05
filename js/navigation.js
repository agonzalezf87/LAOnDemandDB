window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

function navigator() {
    if(location.hash.startsWith('#trends')){
        trendsPage()
    }else if(location.hash.startsWith('#search=')){
        searchPage()
    }else if(location.hash.startsWith('#movie=')){
        movieDetailsPage()
    }else if(location.hash.startsWith('#category=')){
        categoryPage()
    }else{
        homePage()
    }
}

function homePage() {
    console.log('Home!!')
    getTrendingMoviesPreview()
    getCategoriesPreview()
}
function searchPage() {
    console.log('Search!!')
}
function movieDetailsPage() {
    console.log('Movie!!')
}
function categoryPage() {
    console.log('Category!!')
}
function trendsPage() {
    console.log('Trends!!')
}