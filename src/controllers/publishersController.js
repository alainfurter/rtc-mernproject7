const {
  getAllPublishersDB,
  getPublisherByIdDB,
  createPublisherDB,
  updatePublisherDB,
  deletePublisherDB,
  getAllBooksForPublisherWithIdDB,
  addBookIDToPublisherWithIdDB,
} = require("../repositories/publishersFunctions");

// GET http://localhost:4001/publishers
const getAllPublishers = async (req, res) => {
  const publishers = await getAllPublishersDB();
  res.status(200).json({ data: publishers });
};

// GET http://localhost:4001/publishers/:id
const getPublisherById = async (req, res) => {
  const { id } = req.params;
  const publisher = await getPublisherByIdDB(id);
  res.status(200).json({ data: publisher });
};

// POST http://localhost:4001/publishers
const createPublisher = async (req, res) => {
  const newPublisher = await createPublisherDB({
    name: req.body.name,
    book_ids: req.body.book_ids,
  });
  res.status(201).json({
    data: newPublisher,
  });
};

// PUT http://localhost:4001/publishers/:id
const updatePublisher = async (req, res) => {
  const { id } = req.params;
  const updatedPublisher = await updatePublisherDB(id, req.body);
  res.status(200).json({ data: updatedPublisher });
};

// DELETE http://localhost:4001/publishers/:id
const deletePublisher = async (req, res) => {
  const { id } = req.params;
  deletePublisherDB(id);
  res.status(200).json({ data: "Publisher deleted" });
};

// --------------------------------------------------

// GET http://localhost:4001/publishers/withbooks/:id
const getAllBooksForPublisherWithId = async (req, res) => {
  const { id } = req.params;
  const publisherAndBooks = await getAllBooksForPublisherWithIdDB(id);
  res.status(200).json({ data: publisherAndBooks });
};

// PUT http://localhost:4001/publishers/addbook/:id
const addBookIDToPublisherWithId = async (req, res) => {
  const { id } = req.params;
  const updatedPublisher = await addBookIDToPublisherWithIdDB(id, req.body);
  res.status(200).json({ data: updatedPublisher });
};

module.exports = {
  getAllPublishers,
  getPublisherById,
  createPublisher,
  updatePublisher,
  deletePublisher,
  getAllBooksForPublisherWithId,
  addBookIDToPublisherWithId,
};
