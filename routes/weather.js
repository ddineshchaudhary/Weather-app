var express = require('express');
var router = express.Router();
require('dotenv').config();
console.log(process.env.apikey);
// const getWeatherData = require("@dinesh15/weatherpackage");
const getWeatherData = require('@dinesh15/weatherapi');

/* GET home page. */
router.get('/',async function(req, res, next) {
    const location = req.query.location; 
    if (!location) {
        return res.render('index', { title: 'Weather App', error: 'Please enter a location.' });
    }
    
    try {
        const weatherData = await getWeatherData(process.env.apikey, location);
        res.render('weather', { 
            title: 'Weather Data',  
            heading: 'Weather Data', 
            location: weatherData.location, 
            current: weatherData.current 
        });
    } catch (error) {
        console.error(error);
        res.render('index', { title: 'Weather App', error: 'Could not retrieve weather data. Please try again.' });
    }
});

module.exports = router;
