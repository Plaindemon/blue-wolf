// requires express 
const express = require('express');
const notes = require('./data/db.json');

const PORT = process.env.PORT || 3009;
// instantiate the server
const app = express();


// express middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('public'));

function filterByQuery(query, notesArray) {
  let filterResults = notesArray;
  if (query.date) {
    filterResults = filterResults.filter(notes => notes.date === query.date);
  }
  if (query.id) {
    filterResults = filterResults.filter(notes => notes.id === query.id)
  }
  if (query.tag) {
    filterResults = filterResults.filter(notes => notes.tag === query.tag)
  }
  return filterResults;
}

app.get('/api/notes', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
    res.json(results);
    // res.send('Hello!');
  });

app.listen(3009, () => {
    console.log(`API server now on port 3009!`);
  });