const cityInput = document.querySelector('#city-input');
const getInfoButton = document.querySelector('#get-data');
const infoSection = document.querySelector('#info-section');
const imperialInputUnit = document.querySelector('#imperial');
const toggleOptionsList = document.querySelector('#set-options');
const settings = document.querySelector('#settings');
const options = Array.from(document.querySelectorAll('.setting-option'));
let isMapCreatedAlready = false; //Flag to make sure createMapAndIcon only runs once.
