const searchFormEl = document.querySelector('#search-form');
const formatSelectorEl = document.querySelector('#format-input');
const searchInputEl = document.querySelector("#search-input");

// Handle form submission and pass the correct search parameters to the search results page for API call
const buttonClickHandler = (e) => {
    e.preventDefault();

    if (!searchInputEl.value) {
        console.error("You need an input value");
        return;
    }
   
    var queryString = './search-results.html?q=' + searchInputEl.value.trim() + '&format=' + formatSelectorEl.value.trim()

    location.assign(queryString);

}
// Event Listener
searchFormEl.addEventListener('submit', buttonClickHandler);