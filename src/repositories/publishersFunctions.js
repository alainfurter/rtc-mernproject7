const { Publisher } = require("../models/publishers");

const getAllPublishersDB = async () => {
  const publishers = await Publisher.find({});
  return publishers;
};

const getPublisherByIdDB = async (id) => {
  const publisher = await Publisher.findById(id);
  return publisher;
};

const createPublisherDB = async (payload) => {
  const newPublisher = new Publisher(payload);
  await newPublisher.save();
  return newPublisher;
};

const updatePublisherDB = async (id, payload) => {
  const updatedPublisher = await Publisher.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedPublisher;
};

const deletePublisherDB = async (id) => {
  await Publisher.findByIdAndDelete(id);
};

const getAllBooksForPublisherWithIdDB = async (id) => {
  const publisherWithBooks = await Publisher.findOne({ _id: id }).populate({
    path: "book_ids",
    model: "Book",
    select: {
      _id: true,
      title: true,
      author: true,
      language: true,
      year: true,
    },
  });
  return publisherWithBooks;
};

const addBookIDToPublisherWithIdDB = async (id, payload) => {
  const book_id = payload.book_id;
  const updatedPublisher = await Publisher.findByIdAndUpdate(
    id,
    { $push: { book_ids: book_id } },
    {
      new: true,
    }
  );
  return updatedPublisher;
};

module.exports = {
  getAllPublishersDB,
  getPublisherByIdDB,
  createPublisherDB,
  updatePublisherDB,
  deletePublisherDB,
  getAllBooksForPublisherWithIdDB,
  addBookIDToPublisherWithIdDB,
};
