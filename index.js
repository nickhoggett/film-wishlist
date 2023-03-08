const getSearchButton = document.getElementById('search')
const getSearchInput = document.getElementById('search-input')

let wishlist = []

async function renderSearchResults() {
    let filmList = document.getElementById('film-container')
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
                <div class="film-title"> 
                    <h3>${data.Title}</h3>
                    <p>⭐ ${data.Ratings[0].Value}<p>
                </div>
                <div class="film-row"> 
                    <p>${data.Runtime}</p>
                    <p>${data.Genre}</p>
                    <p><i class="fa-solid fa-circle-plus add-wishlist"></i>Watchlist</p>                  
                </div>
                <p>${data.Plot}</p>
            </div>               
        </div>
        <hr>
        `
    }
    const getAddIcons = document.querySelectorAll('.add-wishlist')
    getAddIcons.forEach(el => el.addEventListener('click', () => {
        console.log('clicked')
    }))
}

getSearchButton.addEventListener('click', renderSearchResults)
