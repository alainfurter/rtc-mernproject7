const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  name: String,
  book_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

const Publisher = mongoose.model("Publisher", publisherSchema);

module.exports = { Publisher };
