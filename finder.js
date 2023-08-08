const axios = require('axios');

// Kiwi API configuration
const KIWI_API_KEY = 'https://flight-ticketing-systems.p.rapidapi.com/%7BPATH%7D';
const BASE_URL = 'https://api.skypicker.com';

async function getFlightPrices(source, destination) {
  try {
    const response = await axios.get(`${BASE_URL}/flights?fly_from=${source}&fly_to=${destination}&partner=picky&v=3&locale=en&curr=INR&apiKey=${KIWI_API_KEY}`);
    
    const airlines = response.data.data;
    if (!airlines || airlines.length === 0) {
      return 'No flight prices found for the given route.';
    }

    const formattedPrices = {};

    airlines.forEach(airline => {
      formattedPrices[airline.airlines] = `rs ${airline.price}`;
    });

    return formattedPrices;
  } catch (error) {
    console.error('Error fetching flight prices:', error);
    return 'An error occurred while fetching flight prices.';
  }
}


const source = 'Delhi';
const destination = 'Jaipur';

getFlightPrices(source, destination)
  .then(result => console.log(result))
  .catch(error => console.error('Error:', error));
