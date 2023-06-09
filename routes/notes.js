const notes = require("express").Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uniqid = require('uniqid');

// GET path that retrieves the saved notes in db.json
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST path that adds a new note to db.json
notes.post("/", (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uniqid(),
      };
  
      // Appends the new note and provides the note in the response to the user
      readAndAppend(newNote, './db/db.json');
      res.json(newNote);
    } else {
      res.error('Error in adding Note');
    }
});


module.exports = notes;
