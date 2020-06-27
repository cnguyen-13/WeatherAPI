//Document elements
const cityInput = document.getElementById('city-input');
const getInfoButton = document.getElementById('get-data');
const runDown = document.getElementById('run-down');
const imperialInputUnit = document.getElementById('imperial');
let isMapCreatedAlready = false; //Flag to make sure createMapAndIcon only runs once.

function createMapAndIcon() {
    if (!isMapCreatedAlready) {
        const citymap = L.map('map').setView([29.76, -95.37], 5);
        const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tiles = L.tileLayer(tileUrl, {attribution});
        tiles.addTo(citymap);

        //Custom marker
        const cityIcon = L.icon({
            iconUrl: 'cityscape-town-pngrepo-com.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [-3, -76],
        });
        const marker = L.marker([29.76, -95.37], {icon: cityIcon}).addTo(citymap);
        isMapCreatedAlready = true;  
        return {citymap, marker}; //Return the marker object so that getWeather can setlatlng     
    } else {
        console.log('Map and Icon already created');
    }
}

const { citymap, marker } = createMapAndIcon(); 

async function getWeather() {
    //Setting up the URL to fetch
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q='
    const cityToGet = cityInput.value;
    const apiKey = '&APPID=d024ae907562938d86f1fd5d2f3d0fab';
    let units;

    //Units setup
    if (imperialInputUnit.checked) {
        units = '&units=imperial';
    } else {
        units = '&units=metric';
    }

    const endpointUrl = baseUrl + cityToGet + apiKey + units;

    //Fetching the data from URL
    try {
        const response = await fetch(endpointUrl);
        if (response.ok) {
            const data = await response.json();
        
            //Information to display;
            const country = data.sys['country'];
            const city = data.name;
            const latitude = data.coord['lat'];
            const longitude = data.coord['lon'];
            const cityHumidity = data.main['humidity'];
            const cityWeatherMain = data.weather[0]['main'];
            const cityWeatherDescript = data.weather[0]['description'];
            let cityTemp = data.main['temp'];
            
            if (units === '&units=imperial') {
                cityTemp += '°F'
            } else {
                cityTemp += '°C'
            }
            
            //Writing parsed data to rundown section of HTML.
            runDown.innerHTML = `<h3>Information For the City:</h3><br>
                                <b>Country</b>: ${country}<br>
                                <b>Latitude</b>: ${latitude}<br>
                                <b>Longitude</b>: ${longitude}<br>
                                <b>Humidity</b>: ${cityHumidity}<br>
                                <b>Weather</b>: ${cityWeatherMain}<br>
                                <b>Description</b>: ${cityWeatherDescript}<br>
                                <b>Temperature</b>: ${cityTemp}<br>`;
    
            //Setting the marker and city location.
            citymap.setView([latitude, longitude], 5);
            marker.setLatLng([latitude, longitude]);  
            cityInput.value = '';        
        } else {
            throw new Error('404');
        }
    
    //Invalid city name
    } catch(error) {
        runDown.innerHTML = `<p class="text-danger"><b>"${cityInput.value}" is an INVALID city!</p></b>`;
        cityInput.value = '';
    }
}

function main() {
    //When the user hits enter after typing city name. Thanks w3schools.com!!!
    cityInput.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            getInfoButton.click();
        }
    });

    getInfoButton.addEventListener('click', getWeather);
}

 main();
 