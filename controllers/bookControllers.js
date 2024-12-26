const Book = require("../models/bookModel.js");

exports.createBook = async (req, res) => {
  try {
    const { title, author, isbn, availableCopies } = req.body;
    const newBook = new Book({ title, author, isbn, availableCopies });
    await newBook.save();
    res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error Adding Book", error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  const { title, author, isbn, availableCopies, borrowCount } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, isbn, availableCopies, borrowCount },
      { new: true, runValidators: true }, // Ensures updated fields are validated
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating book", error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res
      .status(200)
      .json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting book", error: error.message });
  }
};
