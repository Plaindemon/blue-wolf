// requires express 
const express = require('express');
const notes  = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const { filterByQuery, findById, createNewNote, validateNotes } = require('./lib/notes');


const PORT = process.env.PORT || 3009;
// instantiate the server
const app = express();


// express middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});



app.get('/api/notes', (req, res) => {
  
  notes = JSON.parse(fs.readFileSync('./db/db.json')) || [] 
  res.json(notes)
      // res.send('Hello!');
  });


app.post('/api/notes', (req, res) => {
  // set id based on what the next index of the array will be
  let dataVar = { 
    id: Map.floor(Math.random()*90000),
    title: req.body.title,
    text: req.body.text
  }
  notes.push(dataVar)
  fs.writeFileSync('./db/db.json', JSON.stringify(notes), function(error) {
    if (error) throw error;
  })
  res.json(notes)
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });