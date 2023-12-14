const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  // user because we want to link notes to particular user

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },

  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("Notes", NotesSchema);
