const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const { route } = require('./auth');

//ROUTE 1: routes for getting data from database using post request : login  required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
        console.log(notes.length)
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
})
//ROUTE 2: routes for add notes using post request : login  required
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
    // body('password', 'Password must be atleast 8 character').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if there are errors, then return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save()

        res.json(savednote);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 3: routes for update an existing notes using post request '/api/note/updatenote': login  required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create a new note object
    let newnote = {};
    if (title) { newnote.title = title };
    if (description) { newnote.description = description };
    if (tag) { newnote.tag = tag };

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    console.log("kaha galti kr raaha")
    if (!note) { res.status(404).send("Not Found") }

    if (note?.user.toString() !== req.user.id) {
        res.status(401).send("Not Allowed");
    }
    
    newnote = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
    res.json(newnote);
})

//ROUTE 4: routes for deleting an existing notes using delete request '/api/note/deletenote': login  required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        
        const { title, description, tag } = req.body;
        //find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        //checks if the user is same user who own this note, otherwise donot allow to delete
        if (note?.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
    
        newnote = await Note.findByIdAndDelete(req.params.id)
        return res.json({"success": "Your note has been deleted", note: note});
    } catch (error) {
        console.log(error)
    }

})
module.exports = router;

