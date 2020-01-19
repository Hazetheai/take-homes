const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routesIndex = require('./routes/index');

const app = express();

app.use(bodyParser.json());
routesIndex(app);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
// const REDIS_PORT = process.env.PORT || 6379;

app.listen(PORT, () => {
  console.log(`Purring like a kitten on port ${PORT}`);
});
