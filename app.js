const express = require("express");
const axios = require("axios");
const app = express();

require("dotenv").load();

const ACCUWEATHER_CORE_API_KEY = process.env.ACCUWEATHER_CORE_API_KEY;
const ACCUWEATHER_MINUTE_API_KEY = process.env.ACCUWEATHER_MINUTE_API_KEY;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/forecast/core/:geoPos", function(req, res, next) {
  axios
    .get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${req.params.geoPos}?details=true&apikey=${ACCUWEATHER_CORE_API_KEY}`
    )
    .then(resp => res.send(resp.data))
    .catch(next);
});

app.get("/forecast/minute/:latLong", function(req, res, next) {
  axios
    .get(
      `http://dataservice.accuweather.com/forecasts/v1/minute?q=${
        req.params.latLong
      }&apikey=${ACCUWEATHER_MINUTE_API_KEY}`
    )
    .then(resp => res.send(resp.data))
    .catch(next);
});

app.get("/forecast/geoPos/:latLong", function(req, res, next) {
  axios
    .get(
      `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=${
        req.params.latLong
      }&apikey=${ACCUWEATHER_CORE_API_KEY}`
    )
    .then(resp => res.send(resp.data))
    .catch(next);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
