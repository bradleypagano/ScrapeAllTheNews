const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  body: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  isSaved: {
    type: Boolean,
    required: true,
    default: false
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Notes"
  }
});

const Articles = mongoose.model("Articles", ArticlesSchema);

module.exports = Articles;
