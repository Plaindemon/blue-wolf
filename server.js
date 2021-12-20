// requires express 
const express = require('express');
const notes = require('./db/db.json');

const PORT = process.env.PORT || 3009;
// instantiate the server
const app = express();


// express middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

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

function findById(id, notesArray) {
  const result = notesArray.filter(notes => notes.id === id)[0];
  return result;
}


app.get('/api/notes', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
    res.json(results);
    // res.send('Hello!');
  });

app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  res.json(result);
})


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });