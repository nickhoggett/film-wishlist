import { currentDog } from "./Dog.js";


function renderDog() {
    document.getElementById('profile').innerHTML = currentDog.getDogProfile()
    
}

function handleClick(e) {
    if (e.target.id === 'like-button') {
        currentDog.likedProfile()
    } else if (e.target.id === 'nope-button') {
        currentDog.nopedProfile()
    }
}

renderDog()

document.addEventListener('click', (e) => {
    handleClick(e)
    setTimeout (() => 
        renderDog(), 1500
    )
    
})