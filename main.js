const randomBtn = document.querySelector('#option1');
const searchInput = document.querySelector('#search-data-input');
const searchBtn = document.querySelector('#option3');
const optionRadios = document.getElementsByName("options");
const getButton = document.querySelector('#button');
const categoryListContainer = document.querySelector('.joke__categories');
const joke = document.querySelector('#joke');


searchBtn.addEventListener('click', () => {
  searchInput.classList.toggle('hiden');
})

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

let jokeFromSearch;
async function getJokeFromSearchApi(searchValue) {
  const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${searchValue}`);
  jokeFromSearch = await response.json();
  return jokeFromSearch.result[0];
}

getButton.addEventListener('click', handleGet)


function handleGet() {
  /* Random */
  if (optionRadios[0].checked) {
    getDataFromAPIRandom()
      .then(randomJoke => {
        joke.innerHTML = randomJoke.value;
        categoryListContainer.innerHTML = ''; // Очистить контейнер с категориями
        searchInput.value = ''; // Сбросить значение поиска
      })
      .catch(console.error);
    /* From categories */
  } else if (optionRadios[1].checked) {
    joke.innerHTML = '';
    if (categoryListContainer.matches(':empty')) {
      gertCategoriesFromApi()
        .then(showCategories)
        .catch(console.error);
      categoryListContainer.appendChild(categoryList);
    } else {
      getJokeFromCategoryApi()
        .then(jokeFromCategory => {
          joke.innerHTML = jokeFromCategory.value;
          searchInput.value = ''; // Сбросить значение поиска
        })
        .catch(console.error);
    }
    /* Search */
  } else if (optionRadios[2].checked) {
    const searchValue = searchInput.value;
    if (searchValue) {
      joke.innerHTML = '';
      getJokeFromSearchApi(searchValue)
        .then(jokeFromSearch => {
          joke.innerHTML = jokeFromSearch.value;
          categoryListContainer.innerHTML = ''; // Очистить контейнер с категориями
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