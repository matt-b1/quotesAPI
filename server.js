const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

app.get('/api/quotes', (req, res, next) => {
  let allQuotes;
  if (Object.keys(req.query).length === 0) {
    allQuotes = { quotes: quotes};
  } else {
    allQuotes = { quotes: quotes.filter(quote => (quote.person).toLowerCase().includes((req.query.person).toLowerCase()))};
  }
  res.send(allQuotes);
})

app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = { quote: getRandomElement(quotes)};
  res.send(randomQuote);
})

app.post('/api/quotes', (req, res, next) => {
  if (req.query.quote !== '' && req.query.person !== '') {
    const newQuote = { quote: { quote: req.query.quote, person: req.query.person}};
    quotes.push({quote: req.query.quote, person: req.query.person});
    res.send(newQuote);
  }
  else {
    res.status(400).send();
  }
})
