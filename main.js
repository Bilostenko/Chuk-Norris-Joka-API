
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
  return randomJoke;
}
getDataFromAPIRandom().then(randomJoke => {
  console.log(randomJoke);
}).catch(error => {
  console.error(error);
});

/* click on Random button for insert joke */
/* randomBtn.addEventListener('click', () => {
  
  getDataFromAPIRandom().then(randomJoke => {
    const joke = document.querySelector('#joke');
    joke.innerHTML = randomJoke.value;
  }).catch(error => {
    console.error(error);
  });
}) */

button.addEventListener('click', () => {
  const options = document.getElementsByName("options");
    for (let i = 0; i < options.length; i++) {
    if (options[i].checked == true && options[i].value == 'option1') {
      console.log(options[i].checked );
      getDataFromAPIRandom().then(randomJoke => {
        const joke = document.querySelector('#joke');
        joke.innerHTML = randomJoke.value;
      }).catch(error => {
        console.error(error);
      });
      break;
    }
  }

  })





