const Borrower = require("../models/borrowerModel");
const Book = require("../models/bookModel");

// Borrow a book
exports.addBookToBorrower = async (req, res) => {
  const { borrowerId, bookId } = req.body;

  try {
    // Find the borrower
    const borrower = await Borrower.findById(borrowerId);

    if (!borrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }

    // Find the book
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if there are available copies of the book
    if (book.availableCopies <= 0) {
      return res
        .status(400)
        .json({ message: "No available copies of the book to borrow" });
    }

    // Check membership type constraints
    if (
      (borrower.membershipType === "standard" &&
        borrower.borrowedBooks.length >= 5) ||
      (borrower.membershipType === "premium" &&
        borrower.borrowedBooks.length >= 10)
    ) {
      return res.status(400).json({
        message: `Borrower has reached the borrowing limit for ${borrower.membershipType} membership.`,
      });
    }

    // Add the book to the borrower's borrowedBooks list
    borrower.borrowedBooks.push(bookId);
    await borrower.save();

    // Decrease the book's availableCopies
    book.availableCopies -= 1;
    await book.save();

    res
      .status(200)
      .json({ message: "Book borrowed successfully", borrower, book });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error borrowing book", error: error.message });
  }
};

// Return a book
exports.removeBookFromBorrower = async (req, res) => {
  const { borrowerId, bookId } = req.body;

  try {
    // Find the borrower
    const borrower = await Borrower.findById(borrowerId);

    if (!borrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }

    // Find the book
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Remove the book from the borrower's borrowedBooks list
    const bookIndex = borrower.borrowedBooks.findIndex(
      (id) => id.toString() === bookId,
    );

    if (bookIndex === -1) {
      return res
        .status(400)
        .json({ message: "Borrower has not borrowed this book" });
    }

    borrower.borrowedBooks.splice(bookIndex, 1);
    await borrower.save();

    // Increase the book's availableCopies
    book.availableCopies += 1;
    await book.save();

    res
      .status(200)
      .json({ message: "Book returned successfully", borrower, book });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error returning book", error: error.message });
  }
};
