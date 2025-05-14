// Global variable to store city data
let globalCityData = [];
let apiUrl = 'http://localhost:3000/weather';

// Function to initialize the data
async function loadInitialCityData() {
    try {
        // Using the API with HTTPS
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        globalCityData = data.list || [];

        // Immediately display all cities when data is loaded
        displayCities(globalCityData);
        console.log('Initial city data loaded:', globalCityData);
    } catch (error) {
        console.error('Error loading weather data:', error);
        // Fallback to sample data if API fails
        globalCityData = [
            {
                name: "Rome",
                coord: { lat: 41.9028, lon: 12.4964 },
                main: { temp: 20, humidity: 65 }
            },
            {
                name: "Cairo",
                coord: { lat: 30.0444, lon: 31.2357 },
                main: { temp: 28, humidity: 40 }
            }
        ];
        displayCities(globalCityData);
    }
}

// Function to display cities
function displayCities(cities) {
    // Update results count
    const resultsCount = document.getElementById('results-count');
    resultsCount.textContent = `${cities.length} ${cities.length === 1 ? 'city' : 'cities'} found`;

    const cityList = document.getElementById('city-list');
    cityList.innerHTML = '';
    cities.forEach(city => {
        const cityItem = document.createElement('li');
        cityItem.textContent = `${city.name} (${city.coord.lat.toFixed(2)}°N, ${city.coord.lon.toFixed(2)}°E) - Temperature: ${city.main.temp}°C, Humidity: ${city.main.humidity}%`;
        cityList.appendChild(cityItem);
    });
}

// Load data when document is ready
document.addEventListener('DOMContentLoaded', loadInitialCityData);

const searchBox = document.getElementById('search-box');

// Add input event listener to search box for real-time filtering
searchBox.addEventListener('input', () => {
    const searchTerm = searchBox.value.trim().toLowerCase();

    // If search is empty, show all cities, otherwise filter by starting letters
    const filteredCities = searchTerm ?
        globalCityData.filter(city => city.name.toLowerCase().startsWith(searchTerm)) :
        globalCityData;

    displayCities(filteredCities);
});