const randomBtn = document.querySelector('#option1');
const fromCategoryBtn = document.querySelector('#option2');
const searchBtn = document.querySelector('#option3');
const searchInput = document.querySelector('#search-data-input');
const optionRadios = document.getElementsByName("options");
const getButton = document.querySelector('#button');
const categoryListContainer = document.querySelector('.joke__categories');
const joke = document.querySelector('#joke');

/* sending request to API for RANDOM joke */
let randomJoke;
async function getDataFromAPIRandom() {
  const response = await fetch('https://api.chucknorris.io/jokes/random');
  randomJoke = await response.json();
  console.log(randomJoke)
  return randomJoke;
}


/* sending request to API for CATEGORY joke */
/* choose category */
let categoryJoke;
async function gertCategoriesFromApi() {
  const response = await fetch('https://api.chucknorris.io/jokes/categories');
  categoryJoke = await response.json();
  return categoryJoke;
}

/* choose joke inside category */
let jokeFromCategory;
async function getJokeFromCategoryApi() {
  const selectedCategory = document.querySelector('input[name="category"]:checked').value;
  const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${selectedCategory}`);
  jokeFromCategory = await response.json();
  return jokeFromCategory;
}

/* sending request to API for SEARCH joke */
let jokeFromSearch;
async function getJokeFromSearchApi(searchValue) {
  const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${searchValue}`);
  jokeFromSearch = await response.json();
  console.log(jokeFromSearch)
  return jokeFromSearch.result[Math.floor(Math.random() * jokeFromSearch.total)];
}

/* reset ALL values */
function resetAll() {
  joke.innerHTML = '';
  categoryListContainer.innerHTML = '';
  searchInput.value = '';
  searchInput.classList.add('hiden');
}
randomBtn.addEventListener('click', resetAll)
fromCategoryBtn.addEventListener('click', resetAll)
searchBtn.addEventListener('click', () => {
  searchInput.classList.remove('hiden')
  joke.innerHTML = '';
  categoryListContainer.innerHTML = '';
  searchInput.value = '';
});




getButton.addEventListener('click', handleGet)

function handleGet() {
  /* Random */
  if (optionRadios[0].checked) {
    getDataFromAPIRandom()
      .then(randomJoke => {
        joke.innerHTML = randomJoke.value;
      })
      .catch(console.error);
    /* From categories */
  } else if (optionRadios[1].checked) {
    if (categoryListContainer.matches(':empty')) {
      gertCategoriesFromApi()
        .then(showCategories)
        .catch(console.error);
      categoryListContainer.appendChild(categoryList);
    } else {
      getJokeFromCategoryApi()
        .then(jokeFromCategory => {
          joke.innerHTML = jokeFromCategory.value;
        })
        .catch(console.error);
    }
    /* Search */
  } else if (optionRadios[2].checked) {
    const searchValue = searchInput.value;
    if (searchValue) {
      getJokeFromSearchApi(searchValue)
        .then(jokeFromSearch => {
          joke.innerHTML = jokeFromSearch.value;
        })
        .catch(console.error);
    } else {
      joke.innerHTML = 'Enter your search term';
    }
  }
}


function showCategories(categories) {
  const categoryList = document.createElement('div');
  categoryList.classList.add('category-inputs');
  categories.forEach(category => {
    const categoryInput = document.createElement('input');
    categoryInput.type = 'radio';
    categoryInput.name = 'category';
    categoryInput.value = category;
    categoryInput.id = `category-${category}`;
    const label = document.createElement('label');
    label.textContent = category;
    label.htmlFor = `category-${category}`;
    label.classList.add('category-label');
    categoryList.appendChild(categoryInput);
    categoryList.appendChild(label);
  });
  categoryListContainer.appendChild(categoryList);
}

/* add jokes to favorite and remove from favorite */

const favoriteJokesList = document.querySelector('#favorite__jokes');
const addToFavoriteBtn = document.querySelector('#add-to-favorite');
const removeFavoriteBtn = document.querySelector('#remove-from-favorite');

let addedJokes = [];
addToFavoriteBtn.addEventListener('click', addToFavorite)
removeFavoriteBtn.addEventListener('click', removeFromFavorite)

/* add JOKE to FAVORITE and remove JOKE from Favorite */
function addToFavorite() {
/*          add */
  const jokeText = joke.textContent;
  if (addedJokes.includes(jokeText)) {
    alert('Nothing to add');
    return;
  }
  const newFavoriteJoke = document.createElement('li');
  newFavoriteJoke.innerHTML = jokeText;
  favoriteJokesList.appendChild(newFavoriteJoke);
  addedJokes.push(jokeText);

/*          remove */
  const selectedJokes = favoriteJokesList.querySelectorAll('li');
  if (selectedJokes.length === 0) {
    alert('No joke to remove');
    return;
  }
  selectedJokes.forEach(joke => {
    joke.addEventListener('click', () => {
      if (addedJokes.includes(joke.textContent)) {
        favoriteJokesList.removeChild(joke);
        addedJokes = addedJokes.filter(item => item !== joke.textContent);
      }
    });
  });
}
