const resultTextEl = document.querySelector('#result-text');
const resultsContentEl = document.querySelector('#result-content')
const searchFormEl = document.querySelector('#search-form');
const formatSelectorEl = document.querySelector('#format-input');
const searchInputEl = document.querySelector("#search-input");
const backBtnEl = document.querySelector('#back-btn');
// Retrive parameters from the index.html search in the document location
const getParams = () => {
    let searchParams = document.location.search.split('&');
    let searchInput = searchParams[0].split('=')[1];
    let formatInput = searchParams[1].split('=')[1];
    searchQuery(searchInput, formatInput);
}
// Place the search input on the top of the page for results text
const searchQuery = (searchInput, formatInput) => {

    if (searchInput) {
        resultTextEl.textContent = decodeURIComponent(searchInput);

        getSearchResults(searchInput, formatInput);
    }
    else {
        document.location.replace('./index.html')
    }
};
// API call to get search results
const getSearchResults = (search, format) => {
    let apiUrl = 'https://www.loc.gov/search/';
    if (format) {
        apiUrl = 'https://www.loc.gov/' + format
    }
    apiUrl = apiUrl + "?q=" + search + '&fo=json';

    fetch(apiUrl).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                displaySearch(data);
                console.log(data);
            });
        } 
        else {
            document.location.replace('./index.html');
        }
    });
};
// Display the search results with javascript with each result being a bootstrap card
const displaySearch = (data) => {
    resultsContentEl.textContent = '';
    if (data.results.length === 0) {
        resultsContentEl.textContent = "Zero search results have been found";
        return;
    }

    for (let i=0; i < data.results.length; i++) {
        let resultTextEl = document.createElement('div');
        resultTextEl.classList = 'card bg-light text-dark mb-3 p-3'
        let titleEl = document.createElement('h3');
        titleEl.classList = 'card-body';
        let descriptionEl = document.createElement('p');
        let linkEl = document.createElement('a');
        linkEl.classList = 'btn btn-primary';
        linkEl.textContent = "Learn More"
        linkEl.href = data.results[i].url;
        titleEl.textContent = data.results[i].title;
        descriptionEl.textContent = data.results[i].description;
        titleEl.appendChild(descriptionEl);
        let linkParagraphEl = document.createElement('p');
        linkParagraphEl.appendChild(linkEl);
        titleEl.appendChild(linkParagraphEl);
        resultTextEl.appendChild(titleEl);
        resultsContentEl.appendChild(resultTextEl);
    }
}
// search handler
const buttonClickHandler = (e) => {
    e.preventDefault();

    if (!searchInputEl.value) {
        console.error("You need an input value");
        return;
    }
   
    searchQuery(searchInputEl.value.trim(), formatSelectorEl.value.trim());

}
// Go back to main menu
const goBack = () => {
    document.location.replace('./index.html');
}
// Event Listeners
backBtnEl.addEventListener('click', goBack);
searchFormEl.addEventListener('submit', buttonClickHandler);

getParams();