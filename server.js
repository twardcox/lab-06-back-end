'use strict';

//  App dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Global vars
const PORT = process.env.PORT;

// Make our server middleware
const app = express();
app.use(cors());

// =============================================================
// Functions and Object constructors

// searches DB for location information returns a new object
function searchToLatLng(locationName) {
  const geoData = require('./data/geo.json');
  const location = new Location(locationName, geoData.results[0].formatted_address, geoData.results[0].geometry.location.lat, geoData.results[0].geometry.location.lng);

  // const location = {
  //   search_query: locationName,
  //   formatted_query: geoData.results[0].formatted_address,
  //   latitude: geoData.results[0].geometry.location.lat,
  //   longitude: geoData.results[0].geometry.location.lng
  // };
  return location;
}

// Location Object constructor

function Location(locationName, query, lat, lng) {
  this.search_query = locationName;
  this.formatted_query = query;
  this.latitude = lat;
  this.longitude = lng;
}

// Set up route to location page
app.get('/location', (req, res) => {
  try {
    const LocationData = searchToLatLng(req.query.data);
    res.send(LocationData);
  } catch (e) {
    res.status(500).send('Status 500: You loose!');
  }
});

// Default selector and notifier
app.use('*', (req, res) => {
  res.status(404).send('You went to the wrong page.');
});

// start the server
app.listen(PORT, () => {
  console.log(`app is up on port ${PORT}`);
});
