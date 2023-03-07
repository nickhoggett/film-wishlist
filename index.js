const getSearchButton = document.getElementById('search')
const getSearchInput = document.getElementById('search-input')
const getAddButton = document.getElementsByClassName('fa-circle-plus')

function renderSearchResults() {
    let filmList = document.getElementById('film-list')
    filmList.innerHTML = ''
    const searchValue = getSearchInput.value.split(' ').join('+')
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=8fc6c297`)
        .then(res => res.json())
        .then(data => {
            for (let movie of data.Search) {
                fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=8fc6c297`) 
                .then(res => res.json())
                .then(data => {
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
                            <p><i class="fa-solid fa-circle-plus"></i>Watchlist</p>                  
                        </div>
                        <p>${data.Plot}</p>
                    </div>
                    
                </div>
                <hr>
                `
            })
        }
    })
}

// getAddButton.addEventListener('click', () => {
//     console.log('clicked')
// })

document.addEventListener ('keydown', (event) => {
    if (event.key === "Enter") {
        renderSearchResults()
    }
    
})
getSearchButton.addEventListener('click', renderSearchResults)
