import { checkAuth, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

const slogansEl = document.querySelector('.slogans');
const sloganFormEl = document.querySelector('.slogan-form');

const waterfrontImgEl = document.querySelector('.waterfront-image');
const castleImgEl = document.querySelector('.castle-image');
const skylineImgEl = document.querySelector('.skyline-image');

const waterfrontDropdown = document.querySelector('.waterfront-dropdown');
const castleDropdown = document.querySelector('.castle-dropdown');
const skylineDropdown = document.querySelector('.skyline-dropdown');

const nameFormEl = document.querySelector('.name-form');
const cityNameEl = document.querySelector('.city-name');

waterfrontDropdown.addEventListener('change', async() => {
    const updatedCity = await updateWaterfront
});