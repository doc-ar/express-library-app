const mongoose = require("mongoose");

// Define the Borrower schema
const borrowerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  borrowedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", // Reference to the Book model
    },
  ],
  membershipActive: {
    type: Boolean,
    required: true,
  },
  membershipType: {
    type: String,
    enum: ["standard", "premium"], // Enum for membership types
    required: true,
  },
});

// Pre-save hook to enforce borrowing constraints based on membership type
borrowerSchema.pre("save", async function (next) {
  try {
    if (this.membershipType === "standard" && this.borrowedBooks.length > 5) {
      throw new Error("Standard members can borrow up to 5 books only.");
    }
    if (this.membershipType === "premium" && this.borrowedBooks.length > 10) {
      throw new Error("Premium members can borrow up to 10 books only.");
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Create the Borrower model
const Borrower = mongoose.model("Borrower", borrowerSchema);

module.exports = Borrower;
