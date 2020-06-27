function toggleSettingsList() {
    settings.classList.toggle('visibility')
}

function getDataButtonPress(event) {
    if (event.keyCode === 13) {
        getInfoButton.click();
    }
}

toggleOptionsList.addEventListener('click', toggleSettingsList);
getInfoButton.addEventListener('click', writeDataToScreen);
cityInput.addEventListener('keyup', getDataButtonPress);
