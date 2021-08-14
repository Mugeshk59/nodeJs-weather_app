const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4fc2f413fcb7ae84eefe44c2a9e7acff&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error)
      callback(chalk.red("Unable to connect to weather services"), undefined);
    else if (body.error) {
      callback("unable to find location!", undefined);
    } else
      callback(
        undefined,
        `climate is ${body.current.weather_descriptions} ,It is currently ${body.current.temperature} degrees out.It feels like ${body.current.feelslike} degrees out`
      );
  });
};
module.exports = forecast;
