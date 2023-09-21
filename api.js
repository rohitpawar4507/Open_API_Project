//Import the Axios library
const axios = require('axios');
const { response } = require('express');

//Define the URL of the Open API to access
const apiURL = 'https://api.publicapis.org/entries';

//Make a GET request to the API

axios.get(apiURL)
    .then(response =>{
        //Handle the response here
        console.log('API Response:');
        console.log(response.data); //This well print the API response data

    })

    .catch(error =>{
        //Handle any errors that occurred during the request
        console.error('Error accessing the API:', error);
    })