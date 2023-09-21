const http = require('http');
const axios = require('axios');

const port = 3000; // Choose a port for your server

// Create an HTTP server
const server = http.createServer(async (req, res) => {
  // Define the URL of the open API you want to access
  const apiUrl = 'https://reqres.in/'; // Replace with the actual API URL

  try {
    // Make a GET request to the API
    const response = await axios.get(apiUrl);

    // Set the response headers
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Send the API response as JSON to the browser
    res.end(JSON.stringify(response.data));
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error accessing the API:', error);

    // Set an error response status
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
