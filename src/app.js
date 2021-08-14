const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// console.log(__dirname);
// console.log(path.join(__dirname, "../public "));
const app = express();

//setup paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const ViewPath = path.join(__dirname, "../template/views");
const PartialsPath = path.join(__dirname, "../template/partials");
//setup handlbar engine and view locatin
app.set("view engine", "hbs");
app.set("views", ViewPath);
hbs.registerPartials(PartialsPath);
//to get change the rendering page to other than views
//setup public directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather App",
    name: "Mugesh Kannan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mugesh Kannan",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    EMail: "mugeshk59@gmail.com",
    contact: 8508240058,
  });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      console: "You must provide an search term!",
    });
  }
  res.send({ products: [] });
});
//app.com
//app.com/help
//app.com/about
//app.com/weather
/*
app.get("", (req, res) => {
  res.send("<h1>Weather Report</h1>");
});

app.get("/help", (req, res) => {
  res.send([
    {
      name: "Mugesh Kannan",
      age: 22,
    },
    {
      name: "Miruthula",
      age: 22,
    },
  ]);
});

app.get("/about", (req, res) => {
  res.send("<h1>About US</h1>");
});
*/
app.get("/Weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send("Provide an address!");
  }

  const data = geocode(
    address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });
        // console.log(location);
        res.send({
          forecast: forecastData,
          location,
          address,
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mugesh Kannan",
    errorMessage: "404,Page not Found",
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mugesh Kannan",
    errorMessage: "404,Help article not Found",
  });
});

app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
