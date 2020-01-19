const axios = require('axios');
const redis = require('redis');

const client = redis.createClient(process.env.PORT || 6379);
const baseUrl = 'https://swapi.co/api';

function cache(req, res, next) {
  const people = 'people';
  client.get(people, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.status(200).send(`<h1>${JSON.parse(data).results[0].name}</h2>`);
    } else next();
  });
}

module.exports = async (app) => {
  await app.get('/api/people', cache, (req, res) => {
    axios
      .get(`${baseUrl}/people`)
      .then((data) => {
        const people = data.data;
        client.setex('people', 3600, JSON.stringify(people));

        res.status(200).send(`<h1>${data.data.results[0].name}</h2>`);
      })
      .catch((error) => {
        res
          .status(500)
          .send(
            `These are not the ${
              res.path.split('/')[2]
            }s you are looking for...`
          );
        console.error(error);
      });
  });
  await app.get('/api/planets', cache, (req, res) => {
    axios
      .get(`${baseUrl}/planets`)
      .then((data) => {
        res.status(200).json(data.data);
      })
      .catch((error) => {
        res
          .status(500)
          .send(
            `These are not the ${
              res.path.split('/')[2]
            }s you are looking for...`
          );
        console.error(error);
      });
  });
  await app.get('/api/starships', cache, (req, res) => {
    axios
      .get(`${baseUrl}/starships`)
      .then((data) => {
        res.status(200).json(data.data);
      })
      .catch((error) => {
        res
          .status(500)
          .send(
            `These are not the ${
              res.path.split('/')[2]
            }s you are looking for...`
          );
        console.error(error);
      });
  });
  await app.get('/people/:person', cache, (req, res) => {
    axios
      .get(`${baseUrl}/people/${req.params.person}/`)
      .then((data) => {
        res.status(200).json(data.data);
      })
      .catch((error) => {
        res
          .status(500)
          .send(
            `These are not the ${
              res.path.split('/')[2]
            }s you are looking for...`
          );
        console.error(error);
      });
  });
};
