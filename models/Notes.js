const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

const Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;
