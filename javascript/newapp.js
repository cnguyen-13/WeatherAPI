//Helper Functions
async function getWeatherJSONData() {
    //Creating URL to fetch
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
    const apiKey = '&APPID=d024ae907562938d86f1fd5d2f3d0fab';
    const cityToGet = cityInput.value;
    const units = imperialInputUnit.checked ? '&units=imperial' : '&units=metric';
    const endpointUrl = baseUrl + cityToGet + apiKey + units;

    //Fetching the data from URL
    try {
        const response = await fetch(endpointUrl);
        if (response.ok) {
            const data = await response.json();
            //Reposition City Marker on the map
            const latitude = data.coord['lat'];
            const longitude = data.coord['lon'];
            setCityMarker(latitude, longitude);
            //jsonData to be returned
            return data;
        } else {
            throw new Error('404');
        }
    } catch (error) {
        console.log('Error occurred getting weather information.');
    }
}

function getDataForOptions(jsonData, checkedOptions) {
    const htmlElementsToPrint = [];
    let measuringSystem = imperialInputUnit.checked ? 'imperial' : 'metric';
    for (let i = 0; i < checkedOptions.length; i++) {
        const option = checkedOptions[i];
        const dataLabel = option.name;
        const property = option.value;
        let data;
        let units;

        //Get appropiate data and units
        if (option.classList.contains('temperature')) {
            data = jsonData.main[property];
            units = measuringSystem === 'imperial' ? '°F' : '°C';
        } else if (option.classList.contains('temperature-humidity')) {
            data = jsonData.main[property];
            units = '%';
        } else if (option.classList.contains('country-name')) {
            data = jsonData.sys[property];
            units = '';
        } else if (option.classList.contains('city-name')) {
            data = jsonData[property];
            units = '';
        } else if (option.classList.contains('geo-location')) {
            data = jsonData.coord[property];
            units = "°";
        } else if (option.classList.contains('weather')) {
            data = jsonData.weather[0][property];
            units = '';
        } else { //wind speed
            data = jsonData.wind[property];
            units = measuringSystem === 'imperial' ? 'mph' : 'km/h';
        }
        const elementToAdd = `<p><b>${dataLabel}: </b>${data} ${units}</p>`;
        htmlElementsToPrint.push(elementToAdd);
    }
    return htmlElementsToPrint;
}

function isOptionChecked(option) {
    return option.checked;
}

//MAIN FUNCTION
async function writeDataToScreen() {
    try {
        const jsonData = await getWeatherJSONData();
        const checkedOptions = options.filter(isOptionChecked);
        const linesOfInfo = getDataForOptions(jsonData, checkedOptions);
        infoSection.innerHTML = `<h2>Information about the City of ${cityInput.value.toUpperCase()}</h2>`
        for (let i = 0; i < linesOfInfo.length; i++) {
            infoSection.innerHTML += linesOfInfo[i];
        }
        cityInput.value = '';
    } catch (error) {
        infoSection.innerHTML = `<h2 class="text-danger"><b>"${cityInput.value.toUpperCase()}" is an INVALID city!</b></h2>`;
        cityInput.value = '';
    }
}
