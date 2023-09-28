/** @format */

// preparando o express para escutar
const express = require('express');
const app = express();
app.use(express.json());

// pegando os dados
const fs = require('fs');
const { FormatJason } = require('./utils/formatJason');
const { QuoteMap, QuoteMapCharacter } = require('./utils/quoteMap');

const data_source = fs.readFileSync('../fake-data/source-quote.json', 'utf8');
const data_character = fs.readFileSync(
	'../fake-data/character-quote.json',
	'utf8'
);
const source_quote = FormatJason(data_source);
const character_quote = FormatJason(data_character);

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

app.get('/', (req, res) => {
	res.send('Bem vindos a uma API para todos governar!');
});

// get all quotes x books
app.get('/api/quotesbybooks', (req, res) => {
	console.log(source_quote.length);
	console.log(character_quote.length);
	res.send(source_quote);
});

// get  quotes x books by id
app.get('/api/quotesbybooks/:id', (req, res) => {
	const quote = source_quote[parseInt(req.params.id)];
	if (!quote) return res.status(404).send('You have no books here!');

	const quoteformated = QuoteMap(quote.source, quote.quote);
	res.send(quoteformated);
});

// get all quotes x  character
app.get('/api/quotesbycharacter', (req, res) => {
	res.send(character_quote);
});

// get all quotes x character -by id
app.get('/api/quotesbycharacter/:id', (req, res) => {
	const quote = character_quote[parseInt(req.params.id)];
	if (!quote)
		return res
			.status(404)
			.send(
				'You have no quotes here! I am joking, I have just 42 quotes, mellon!'
			);
	const quoteformated = QuoteMapCharacter(
		quote.character,
		quote.english,
		quote.portuguese
	);
	res.send(quoteformated);
});

