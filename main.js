const randomBtn = document.querySelector('#option1');
const searchInput = document.querySelector('#search-data-input');
const searchBtn = document.querySelector('#option3');

const button = document.querySelector('#button');

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
let categoryJoke;
async function getDataFromAPICategory() {
  const response = await fetch('https://api.chucknorris.io/jokes/categories');
  categoryJoke = await response.json();
  return categoryJoke;
}

button.addEventListener('click', () => {
  const allRadioBtns = document.getElementsByName("options");
  for (let i = 0; i < allRadioBtns.length; i++) {
    /* --------------------------------------------RANDOM----------------------- */
    if (allRadioBtns[i].checked == true && allRadioBtns[i].value == 'option1') {
      getDataFromAPIRandom().then(randomJoke => {
        const joke = document.querySelector('#joke');
        joke.innerHTML = randomJoke.value;
      }).catch(error => {
        console.error(error);
      });
      break;
     /* ------------------------------ CATEGORY--------------------------------------- */
    } else if (allRadioBtns[i].checked == true && allRadioBtns[i].value == 'option2') {
      getDataFromAPICategory().then(categories => {
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
        const joke = document.querySelector('#joke');
        joke.innerHTML = '';
        joke.appendChild(categoryList);
      }).catch(error => {
        console.error(error);
      });
      break;
    }
  }

})