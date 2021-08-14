const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?types=country&access_token=pk.eyJ1IjoibXVnZXNoazE5NCIsImEiOiJja3M2dHU0eGUwdWJ0MzFzM204dmx5Z2ZpIn0.1lDESBTrWJam9BuJxN0SmQ&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Could not able to connect to services!", undefined);
    } else if (body.message === "Not Found")
      callback("Could not able to find a location details", undefined);
    else if (body.message === "Not Authorized - Invalid Token")
      callback("Not Authorized - Invalid Token", undefined);
    else if (body.features.length === 0)
      callback("location not found!", undefined);
    else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
