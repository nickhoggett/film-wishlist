const getSearchButton = document.getElementById('search')
const getSearchInput = document.getElementById('search-input')
const getMyWatchList = document.getElementById('watch-list')

let filmList = document.getElementById('film-container')
let watchlist = []

async function renderWatchList() {

    filmList.innerHTML = ''
    for (let id of watchlist) {
        const getWatchList = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=8fc6c297`)
        const data = await getWatchList.json()
        filmList.innerHTML += `
        <div class="film">
            <div class="film-poster">
                <img class="poster" src="${data.Poster}">
            </div>
            <div class="film-details">
                <div class="film-title" data-imdbID="${data.imdbID}"> 
                    <h3>${d }</h3>
                    <p>⭐ ${data.Ratings[0].Value}<p>
                </div>
                <div class="film-row"> 
                    <p>${data.Runtime}</p>
                    <p>${data.Genre}</p>
                    <p><i class="fa-solid fa-circle-plus add-wishlist" data-imdbID="${data.imdbID}"></i>Watchlist</p>                  
                </div>
                <p>${data.Plot}</p>
            </div>               
        </div>
        <hr>
        `
    }
    
}

async function renderSearchResults() {
    
    filmList.innerHTML = ''
    const searchValue = getSearchInput.value.split(' ').join('+')
    const getSearch = await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=8fc6c297`)
    const data = await getSearch.json()
    for (let movie of data.Search) {
        const fetchFilms = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=8fc6c297`) 
        const data = await fetchFilms.json()
        filmList.innerHTML += `
        <div class="film">
            <div class="film-poster">
                <img class="poster" src="${data.Poster}">
            </div>
            <div class="film-details">
                <div class="film-title" data-imdbID="${data.imdbID}"> 
                    <h3>${data.Title}</h3>
                    <p>⭐ ${data.Ratings[0].Value}<p>
                </div>
                <div class="film-row"> 
                    <p>${data.Runtime}</p>
                    <p>${data.Genre}</p>
                    <p><i class="fa-solid fa-circle-plus add-wishlist" data-imdbID="${data.imdbID}"></i>Watchlist</p>                  
                </div>
                <p>${data.Plot}</p>
            </div>               
        </div>
        <hr>
        `
    }
    const getAddIcons = document.querySelectorAll('.add-wishlist')
    getAddIcons.forEach(el => el.addEventListener('click', (event) => {
        const imdbTag = event.target.getAttribute('data-imdbID')
        watchlist.push(imdbTag)
    }))
}

function keyDownTextField (e) {
    const keyCode = e.keyCode;

    if(keyCode==13) {
        renderSearchResults()
    }
}

getMyWatchList.addEventListener('click', renderWatchList)
getSearchButton.addEventListener('click', renderSearchResults)
addEventListener('keydown', keyDownTextField, false )