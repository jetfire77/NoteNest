// const express = require("express");

// const router = express.Router();

// router.get("/", (req, res) => {
//   res.json([]);
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
var fetchuser = require("../Middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1:  endpoint for get all the notes: GET "/api/notes/login". No login required------------------- ---------------------------

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }

    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

// ROUTE 2:  endpoint for add a new note using : POST "/api/notes/addnote ". No login required------------------- ---------------------------
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 1 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; // destructuring

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();

      res.json(saveNote);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Email already exists" });
      }

      console.error(error);
      res.status(500).json({ error: "Internal Server error" });
    }
  }
);

// ROUTE 3:     Update an exisiting Note using  : PUT "/api/notes/updatenote ". No login required------------------- ---------------------------
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find the note to be updated and update it
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found  ");
    }

    // if user is tryimg to access different user notes
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

// ROUTE 4:     delete an exisiting Note using  : DELETE "/api/notes/deletenote ". No login required------------------- ---------------------------
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found  ");
    }

    // Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

module.exports = router;
