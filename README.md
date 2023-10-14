# rtc-mernproject7
RTC MERN Project 7 - Basic API Rest, Authentication and Cloudinary

Basic API to manage a collection of publishers and their books.


Mongo DB URL:
-----------------------------------------

SET YOUR OWN URL

(see src/config/db.js)


Authentication:
-----------------------------------------

You can freely read all the data in the database (all get requests are freely accessible)

But you need to register a user and login in order to create, update and delete data

1. Register a user with email and password
POST http://localhost:4001/auth/register
Body:
{
  "email" : "USER EMAIL",
  "password": "USER PASSWORD"
}

2. Login with a registered user and password
POST http://localhost:4001/auth/login
{
  "email" : "USER EMAIL",
  "password": "USER PASSWORD"
}

IMPORTANT: retrieve and save the "token" delivered in the response object. This token needs to be supplied in the "Bearer" field of any CREATE, UPDATE, DELETE request below. 


Publisher Collection:
-----------------------------------------

Publisher Schema

const publisherSchema = new mongoose.Schema({
  name: String,
  book_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});


API Endpoints:

1. Get all publishers in the MongoDB collection:
GET http://localhost:4001/publishers


2. Get a particular publisher by its id:
GET http://localhost:4001/publishers/:id


3. Create a new publisher
POST http://localhost:4001/publishers

Submit the following payload in the body of the POST request as an example:
{
      "name": "Publisher Name",
      "book_ids": [
        "book object id"
      ]
}

IMPORTANT: you need to provide the "token" received from the login function in the "auth / bearer" field in order to execute this function.

4. Update a particular publisher identified by its id:
PUT http://localhost:4001/publishers/:id

Submit updated keys and values for a particular car identifed by its id. Possible keys:
{
      "name": "New Name"
}

IMPORTANT: you need to provide the "token" received from the login function in the "auth / bearer" field in order to execute this function.

5. Delete a particular publisher identified by its id:
DELETE http://localhost:4001/publishers/:id

IMPORTANT: you need to provide the "token" received from the login function in the "auth / bearer" field in order to execute this function.


Book Collection:
-----------------------------------------

Book Schema

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  language: String,
  year: String,
  publisher_id: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" },
});


API Endpoints:

1. Get all books in the MongoDB collection:
GET http://localhost:4001/books


2. Get a particular book by its id:
GET http://localhost:4001/book/:id


3. Create a new book
POST http://localhost:4001/books

Submit the following payload in the body of the POST request as an example:
{
      "title": "Title of book",
      "author": "Author of book",
      "language": "Language of book",
      "year": "Year published",
      "publisher_id": "Publisher object id"
}

IMPORTANT: you need to provide the "token" received from the login function in the "auth / bearer" field in order to execute this function.

4. Update a particular book identified by its id:
PUT http://localhost:4001/books/:id

Submit updated keys and values for a particular car identifed by its id. Possible keys:
{
      "language": "New language",
      "year": "New production year"
}

IMPORTANT: you need to provide the "token" received from the login function in the "auth / bearer" field in order to execute this function.

5. Delete a particular book identified by its id:
DELETE http://localhost:4001/books/:id

IMPORTANT: you need to provide the "token" received from the login function in the "auth / bearer" field in order to execute this function.


Relationship between publisher and books:
-----------------------------------------

API Endpoints:

1. Get a particular book identified by its id with the publisher details 
GET http://localhost:4001/books/withpublisher/:id
id: book id

2. Get a particular publisher identified by its id with the book details 
GET http://localhost:4001/publishers/withbooks/:id
id: publisher id


3. Add a particular publisher id to a book identified by its id
PUT http://localhost:4001/books/addpublisher/:id

id: book id
payload in body:
{
    "publisher_id": "id of publisher to add or replace"
}

IMPORTANT: you need to provide the "token" received from the login function in the "auth / bearer" field in order to execute this function.

4. Add a particular book id to a publisher's book_ids array identified by its id
PUTttp://localhost:4001/publishers/addbook/:id

id: publisher id
payload in body:
{
      "book_id": "id of book to add to the array book_ids"
}

IMPORTANT: you need to provide the "token" received from the login function in the "auth / bearer" field in order to execute this function.


User avatar image and book cover image uploads:
-----------------------------------------

1. You can add an avatar image to your user
POST http://localhost:4001/auth/upload-avatar

You need to provide your image in the "Body", "Form", "Files" with the "avatar" key

IMPORTANT: you need to provide the "token" received from the login function in the "auth / bearer" field in order to execute this function.

2. You can add a book cover to your book identified by its book id
POST http://localhost:4001/books/addcover/:id

id: book id

You need to provide your image in the "Body", "Form", "Files" with the "cover" key

IMPORTANT: you need to provide the "token" received from the login function in the "auth / bearer" field in order to execute this function.
