const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); // This enables CORS for all routes

// Serve static files from src directory
app.use(express.static('src'));

// Proxy endpoint
app.get('/weather', async (req, res) => {
    try {
        const response = await axios.get('https://samples.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=b6907d289e10d714a6e88b30761fae22');
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
