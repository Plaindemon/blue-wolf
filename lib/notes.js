const fs = require("fs");
const path = require("path");

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
  
  function createNewNote(body, notesArray) {
    const notes = body;
    notesArray.push(notes);
    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    return notes;
  }
  
  function validateNotes(notes) {
    if (!notes.title || typeof notes.title !== 'string') {
        return false;
      }
    if (!notes.text || typeof notes.text !== 'string') {
      return false;
    }
    return true;
  }

  module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNotes
  };