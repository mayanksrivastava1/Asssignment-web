const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./bookModel');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// GET all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new book
app.post('/books', async (req, res) => {
  const newBook = new Book(req.body);

  try {
    const savedBook = await newBook.save();
    res.json({ message: 'Book added successfully', book: savedBook });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT (update) an existing book
app.put('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;

  try {
    const updatedBookResult = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true });
    res.json({ message: 'Book updated successfully', book: updatedBookResult });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a book
app.delete('/books/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    await Book.findByIdAndDelete(bookId);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
