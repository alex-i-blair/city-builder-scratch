import { checkAuth, logout, updateCastle, updateSkyline, updateWaterfront, createDefaultCity, getCity, updateSlogans, updateName } from '../fetch-utils.js'; 

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

const slogansEl = document.querySelector('#slogans');
const sloganFormEl = document.querySelector('#slogan-form');

const waterfrontImgEl = document.querySelector('#waterfront-image');
const castleImgEl = document.querySelector('#castle-image');
const skylineImgEl = document.querySelector('#skyline-image');

const waterfrontDropdown = document.querySelector('#waterfront-dropdown');
const castleDropdown = document.querySelector('#castle-dropdown');
const skylineDropdown = document.querySelector('#skyline-dropdown');

const nameFormEl = document.querySelector('#name-form');
const cityNameEl = document.querySelector('#city-name');

window.addEventListener('load', async() => {
    const city = await getCity();
    if (!city) {
        const newCity = await createDefaultCity();
        console.log(newCity);
        displayCity(newCity);

    } else {
        displayCity(city);
    }
});

waterfrontDropdown.addEventListener('change', async() => {
    const updatedCity = await updateWaterfront(waterfrontDropdown.value);

    displayCity(updatedCity);
});
castleDropdown.addEventListener('change', async() => {
    const updatedCity = await updateCastle(castleDropdown.value);

    displayCity(updatedCity);
});
skylineDropdown.addEventListener('change', async() => {
    const updatedCity = await updateSkyline(skylineDropdown.value);

    displayCity(updatedCity);
});

nameFormEl.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(nameFormEl);
    
    // console.log(city);
    const name = data.get('name');
    // console.log(slogan);
    
    
    const updatedCity = await updateName(name);
    // console.log(updatedCity);
    displayCity(updatedCity);
});

sloganFormEl.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(sloganFormEl);
    const city = await getCity();
    // console.log(city);
    const slogan = data.get('slogan');
    // console.log(slogan);
    city.slogans.push(slogan);
    
    const updatedCity = await updateSlogans(city.slogans);
    // console.log(updatedCity);
    displayCity(updatedCity);
});

function displayCity(city) {

    cityNameEl.textContent = city.name;
    waterfrontImgEl.src = `../assets/${city.waterfront_id}-waterfront.jpeg`;
    skylineImgEl.src = `../assets/${city.skyline_id}-skyline.jpeg`;
    castleImgEl.src = `../assets/${city.castle_id}-castle.jpeg`;
    slogansEl.textContent = '';

    for (let slogan of city.slogans) {
        console.log(city.slogans);
        const sloganEl = document.createElement('p');
        sloganEl.classList.add('slogans');
        sloganEl.textContent = slogan;
        slogansEl.append(sloganEl);
    }
}