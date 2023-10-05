import { fetchBreeds, fetchCatByBreed } from "./cat-api"
import './styles.css'
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
 
const selectEl = document.querySelector('.breed-select')
const loaderEl = document.querySelector('.loader')
const errorEl = document.querySelector('.error')
const catInfoEl = document.querySelector('.cat-info')
loaderEl.classList.replace('loader', 'is-hidden')
errorEl.classList.add('is-hidden')
catInfoEl.classList.add('is-hidden')
let breedsIdArr =[]

inSlimSelect()
function inSlimSelect(data) {
fetchBreeds(data)
  .then(data => {
    breedsIdArr = data.map(({ name, id }) => {
     return `<option value = '${id}'>${name}</option>`
            })
     selectEl.insertAdjacentHTML('beforeend', breedsIdArr)
        new SlimSelect({
            select: selectEl,
        })
        }).catch(onError)     
}
selectEl.addEventListener('change', onSelect)

function onSelect(evt) {
    const breedId = evt.currentTarget.value
    loaderEl.classList.replace('is-hidden', 'loader')
    selectEl.classList.add('is-hidden')
    catInfoEl.classList.add('is-hidden')

fetchCatByBreed(breedId)
.then(data => {
    loaderEl.classList.replace('loader', 'is-hidden')
    selectEl.classList.remove('is-hidden')
    const { url, breeds } = data[0]
    catInfoEl.innerHTML = `<div class="img-div"><img src="${url}" alt="${breeds[0].name}" width="400"/></div>
    <div class="txt-div"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
    catInfoEl.classList.remove('is-hidden');
    })
    .catch(onError) 
}

function onError(error) {
    selectEl.classList.remove('is-hidden')
    loaderEl.classList.replace('loader', 'is-hidden')

Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
    position: 'center-center',
    timeout: 7000,
    width: '400px',
    fontSize: '20px'
    })
}







