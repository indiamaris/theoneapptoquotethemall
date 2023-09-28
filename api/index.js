/** @format */

// preparando o express para escutar
const express = require('express');
const app = express();
app.use(express.json());

// pegando os dados
const fs = require('fs');
const data = fs.readFileSync('../fake-data/source_quote.json', 'utf8');
const books = JSON.parse(data);
const library = books.quotes;
const QuoteMap = require('./utils/quoteMap');
const { FormatQuote } = require('./utils/formatQuote');

app.get('/', (req, res) => {
	res.send('Bem vindos a uma API para todos governar!');
});

//portinhas

const PORT = process.env.PORT || 1988;
app.listen(PORT, () =>
	console.log(`Listen to your heart
When he's calling for you
Listen to your heart
There's nothing else you can do
I don't know where you're going
But I think is in the port ${PORT}`)
);

// get all quotes
app.get('/api/quotes', (req, res) => {
	res.send(library);
});

// get  quotes by id
app.get('/api/quotes/:id', (req, res) => {
	const quote = library[parseInt(req.params.id)];
	const quoteformated = FormatQuote(quote.source, quote.quote);
	if (!quote) res.status(404).send('You have no books here!');
	res.send(quoteformated);
});





