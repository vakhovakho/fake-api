const express = require('express');
const db = require('./connection');
const cors = require('cors');
const app = express();
const port = 5000;

db.connect('app.db');
db.createNotesTable();

app.use(express.json());
app.use(cors())

app.get('/notes', (req, res) => {
	db.getNotes()
	.then(rows => res.send(rows));
});

app.post('/notes', (req, res) => {
	db.insertNote(req.body.title, req.body.description)
		.then(id => res.send(id.toString()));
});

app.put('/notes/:id', (req, res) => {
	db.updateNote(req.params.id, req.body.title, req.body.description);
	res.send('updated');
});

app.delete('/notes/:id', (req, res) => {
	db.deleteNote(req.params.id);
	res.send('deleted');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});