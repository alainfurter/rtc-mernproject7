const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  language: String,
  year: String,
  cover: String,
  publisher_id: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = { Book };
