const { Book } = require("../models/books");

const getAllBooksDB = async () => {
  const books = await Book.find({});
  return books;
};

const getBookByIdDB = async (id) => {
  const book = await Book.findById(id);
  return book;
};

const createBookDB = async (payload) => {
  const newBook = new Book(payload);
  await newBook.save();
  return newBook;
};

const updateBookDB = async (id, payload) => {
  const updatedBook = await Book.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedBook;
};

const deleteBookDB = async (id) => {
  await Book.findByIdAndDelete(id);
};

const getBookWithPublisherForIdDB = async (id) => {
  const bookWithPublisher = await Book.findOne({ _id: id }).populate({
    path: "publisher_id",
    model: "Publisher",
    select: {
      _id: true,
      name: true,
    },
  });
  return bookWithPublisher;
};

const addPublisherIDToBookWithIdDB = async (id, payload) => {
  const updatedBook = await Book.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedBook;
};

const addBookImagePathToBookWithIdDB = async (id, path) => {
  const updatedBook = await Book.findByIdAndUpdate(
    id,
    { cover: path },
    {
      new: true,
    }
  );
  return updatedBook;
};

module.exports = {
  getAllBooksDB,
  getBookByIdDB,
  createBookDB,
  updateBookDB,
  deleteBookDB,
  getBookWithPublisherForIdDB,
  addPublisherIDToBookWithIdDB,
  addBookImagePathToBookWithIdDB,
};
