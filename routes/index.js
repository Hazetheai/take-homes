const axios = require('axios');

const baseUrl = 'https://swapi.co/api/';

module.exports = (app) => {
  app.get('/api/people', (req, res) => {
    axios
      .get(`${baseUrl}people/`)
      .then((data) => {
        res.status(200).json(data.data);
      })
      .catch((error) => console.error(error));
  });
  app.get('/api/planets', (req, res) => {
    axios
      .get(`${baseUrl}planets/`)
      .then((data) => {
        res.status(200).json(data.data);
      })
      .catch((error) => console.error(error));
  });
  app.get('/api/starships', (req, res) => {
    axios
      .get(`${baseUrl}starships/`)
      .then((data) => {
        res.status(200).json(data.data);
      })
      .catch((error) => console.error(error));
  });
  app.get('/api/people/:person', (req, res) => {
    axios
      .get(`${baseUrl}${req.params.person}/`)
      .then((data) => {
        res.status(200).json(data.data);
      })
      .catch((error) => console.error(error));
  });
};
