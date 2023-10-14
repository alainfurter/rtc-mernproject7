const { Book } = require("./books");
const { Publisher } = require("./publishers");

let publishers_list = [
  {
    name: "Simon and Schuster",
    books: [0, 1],
  },
  {
    name: "Pottermore Publishing",
    books: [2, 3],
  },
  {
    name: "Harper Collins",
    books: [4],
  },
];

let books_list = [
  {
    id: 0,
    title: "Sword Fiction",
    author: "Stephen King",
    language: "English",
    year: "2020",
    publisher: 0,
  },
  {
    id: 1,
    title: "Christine",
    author: "Stephen King",
    language: "English",
    year: "2000",
    publisher: 0,
  },
  {
    id: 2,
    title: "Harry Potter and the philosophers stone",
    author: "J. K. Rowling",
    language: "German",
    year: "2015",
    publisher: 1,
  },
  {
    id: 3,
    title: "Harry Potter and the deathly hallows",
    author: "J.K. Rowling",
    language: "French",
    year: "2015",
    publisher: 1,
  },
  {
    id: 4,
    title: "The two towers",
    author: "J.R.R. Tolkien",
    language: "English",
    year: "2012",
    publisher: 2,
  },
];

const clearAndInsertData = async () => {
  try {
    // Create publishers
    await Publisher.collection.drop((err, db) => {
      console.log("Publisher drop: Collection publisher does not exit yet. ");
    });
    await Book.collection.drop((err, db) => {
      console.log("Books drop: Collection books does not exit yet. ");
    });

    console.log("Collections dropped");

    const publishers = await Publisher.create(publishers_list);

    // Create books

    console.log("Publishers created");

    const books = await Book.create(
      books_list.map((book) => ({
        title: book.title,
        author: book.author,
        language: book.language,
        year: book.year,
        publisher_id: publishers[book.publisher]._id,
      }))
    );

    console.log("Books created");

    // load book data into publisher docs
    // for (let i = 0; i < publishers.length; i++) {
    //   const publisher = publishers[i];
    //   const publisherBooks = [];
    //   for (let j = 0; j < books.length; j++) {
    //     const book = books[j];
    //     if (String(book.publisher_id) === String(publisher._id)) {
    //       publisherBooks.push(book._id);
    //     }
    //   }
    //   publisher.book_ids = publisherBooks;
    //   await publisher.save();
    // }

    // using MAP
    await Promise.all(
      publishers.map(async (publisher) => {
        const publisherBooks = await Promise.all(
          books
            .filter(
              (book) => String(book.publisher_id) === String(publisher._id)
            )
            .map(async (_id) => {
              return _id;
            })
        );
        publisher.book_ids = publisherBooks;
        await publisher.save();
      })
    );

    console.log("Successfully seeded data");
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};

module.exports = { clearAndInsertData };
