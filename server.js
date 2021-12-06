// requires express 
const express = require('express');
const notes = require('./data/db.json');

const PORT = process.env.PORT || 3009;
// instantiate the server
const app = express();


// express middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



app.get('/api/notes', (req, res) => {
    res.send('Hello!');
  });

app.listen(3009, () => {
    console.log(`API server now on port 3009!`);
  });