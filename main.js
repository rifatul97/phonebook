const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3001;

var start = new Date();
var fs = require('fs');
var phonebook = [];

fs.readFile('data/phonebook.json', 'utf8', function(err, data) {
	if (err) throw err;
	phonebook = JSON.parse(data);
});

const numinfo = (obj) => {
	return phonebook.keys(obj).length;
}

const countinfo = () => {
	const maxid = phonebook.length > 0 ? Math.max(...phonebook.map(n=>n.id)) : 0;

}

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.end("<h1>Welcome to phonebook REST!</h1><p>but nothing really here tho.</p>");
})

app.get('/info', function(req, res) {
	let n = numinfo('name')
	res.send('<p>The Phonebook has info for ' + Object.keys(phonebook).length + ' people</p>' + 
			  '<p>' + new Date() + '</p>')

//	res.send(', new Date() - start, 'ms');
});

app.get('/api/persons', function(req, res) {
	if(phonebook){
		res.json(phonebook)
	}
	else{
		res.status(404).end()
	}
})

app.get('/api/persons/:id', function(req, res) {
	const id = req.params.id;

	const idinfo = phonebook.find(info => info.id == id);

	if(idinfo){
		res.json(idinfo);
	}
	else{
		res.status(404).end()
	}
})


app.listen(port, () => {
	console.log('phonebook rest is lanuched.')
})