//Leaflet JS Code

function createMapAndIcon() {
    if (!isMapCreatedAlready) {
        const citymap = L.map('map').setView([29.76, -95.37], 5);
        const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tiles = L.tileLayer(tileUrl, { attribution });
        tiles.addTo(citymap);

        //Custom marker
        const cityIcon = L.icon({
            iconUrl: 'images/cityscape-town-pngrepo-com.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [-3, -76],
        });
        const marker = L.marker([29.76, -95.37], { icon: cityIcon }).addTo(citymap);
        isMapCreatedAlready = true;
        return { citymap, marker }; //Return the marker object so that getWeather can setlatlng     
    } else {
        console.log('Map and Icon already created');
    }
}

function setCityMarker(latitude, longitude) {
    citymap.setView([latitude, longitude], 5);
    marker.setLatLng([latitude, longitude]);
}

const { citymap, marker } = createMapAndIcon();
