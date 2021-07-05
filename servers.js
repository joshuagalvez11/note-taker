// Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');

// Sets up the Express App

const app = express();
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => {
    var notes;
    fs.readFile('db/db.json', 'utf8', (error, data) =>
        {
            error ? console.error(error) : notes = JSON.parse(data);
            console.log(notes);
            res.json(notes);
        }
    );
    
});

app.post('/api/notes', (req, res) => {
    var notes;
    var note = 
    {
        "title":req.title,
        "text":req.text
    };
    fs.readFile('db/db.json', 'utf8', (error, data) =>
        {
            error ? console.error(error) : notes = JSON.parse(data);
            console.log(notes);
            notes.push(note);
            fs.writeFile('db/db.json', JSON.stringify(notes), (err) =>
              err ? console.error(err) : res.json(notes)
            );
            
        }
    );

});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));