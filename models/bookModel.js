const mongoose = require("mongoose");

// Define the Book schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  isbn: {
    type: String,
    unique: true,
    required: true,
    minlength: 0,
  },
  availableCopies: {
    type: Number,
    default: 0,
  },
  borrowCount: {
    type: Number,
    default: 0, // Tracks the number of times the book has been borrowed
  },
});

// Pre-save hook to enforce the borrow constraint
bookSchema.pre("save", async function (next) {
  try {
    // Check if the available copies exceed 100 for books borrowed more than 10 times
    if (this.borrowCount > 10 && this.availableCopies > 100) {
      throw new Error(
        "Books borrowed more than 10 times cannot have more than 100 available copies.",
      );
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save hook to enforce the 5 books per author constraint
bookSchema.pre("save", async function (next) {
  try {
    // Check if the book is new or the author is being modified
    if (this.isNew || this.isModified("author")) {
      const bookCount = await mongoose
        .model("Book")
        .countDocuments({ author: this.author });
      if (bookCount >= 5) {
        throw new Error("An author can only be linked to up to 5 books.");
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Create the Book model
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
