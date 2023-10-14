const {
  getAllBooksDB,
  getBookByIdDB,
  createBookDB,
  updateBookDB,
  deleteBookDB,
  getBookWithPublisherForIdDB,
  addPublisherIDToBookWithIdDB,
} = require("../repositories/booksFunctions");

// GET http://localhost:4001/books
const getAllBooks = async (req, res) => {
  const books = await getAllBooksDB();
  res.status(200).json({ data: books });
};

// GET http://localhost:4001/book/:id
const getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await getBookByIdDB(id);
  res.status(200).json({ data: book });
};

// POST http://localhost:4001/books
const createBook = async (req, res) => {
  const newBook = await createBookDB({
    title: req.body.title,
    author: req.body.author,
    language: req.body.language,
    year: req.body.year,
    publisher_id: req.body.publisher_id,
  });
  res.status(201).json({
    data: newBook,
  });
};

// PUT http://localhost:4001/books/:id
const updateBook = async (req, res) => {
  const { id } = req.params;
  const updatedBook = await updateBookDB(id, req.body);
  res.status(200).json({ data: updatedBook });
};

// DELETE http://localhost:4001/books/:id
const deleteBook = async (req, res) => {
  const { id } = req.params;
  deleteBookDB(id);
  res.status(200).json({ data: "Book deleted" });
};

// GET http://localhost:4001/books/withpublisher/:id
const getBookWithPublisherForId = async (req, res) => {
  const { id } = req.params;
  const bookWithPublisher = await getBookWithPublisherForIdDB(id);
  res.status(200).json({ data: bookWithPublisher });
};

// PUT http://localhost:4001/books/addpublisher/:id
const addPublisherIDToBookWithId = async (req, res) => {
  const { id } = req.params;
  const updatedBook = await updateBookDB(id, req.body);
  res.status(200).json({ data: updatedBook });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookWithPublisherForId,
  addPublisherIDToBookWithId,
};
