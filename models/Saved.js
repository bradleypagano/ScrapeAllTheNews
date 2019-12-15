const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SavedSchema = new Schema({
  article: {
    type: Schema.Types.ObjectId,
    ref: "Articles"
  }
});

const Saved = mongoose.model("Saved", SavedSchema);

module.exports = Saved;
