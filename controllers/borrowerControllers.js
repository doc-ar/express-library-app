const Borrower = require("../models/borrowerModel.js");

exports.createBorrower = async (req, res) => {
  try {
    const { name, borrowedBooks, membershipActive, membershipType } = req.body;

    const newBorrower = new Borrower({
      name,
      borrowedBooks,
      membershipActive,
      membershipType,
    });
    await newBorrower.save();

    res.status(201).json({
      message: "Borrower created successfully",
      borrower: newBorrower,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding borrower", error: error.message });
  }
};

// READ - Get all borrowers
exports.getAllBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.find().populate("borrowedBooks");
    res.status(200).json(borrowers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching borrowers", error: error.message });
  }
};

exports.updateBorrower = async (req, res) => {
  const { name, borrowedBooks, membershipActive, membershipType } = req.body;

  try {
    const updatedBorrower = await Borrower.findByIdAndUpdate(
      req.params.id,
      { name, borrowedBooks, membershipActive, membershipType },
      { new: true, runValidators: true },
    );

    if (!updatedBorrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }

    res.status(200).json({
      message: "Borrower updated successfully",
      borrower: updatedBorrower,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating borrower", error: error.message });
  }
};

exports.deleteBorrower = async (req, res) => {
  try {
    const deletedBorrower = await Borrower.findByIdAndDelete(req.params.id);

    if (!deletedBorrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }

    res.status(200).json({
      message: "Borrower deleted successfully",
      borrower: deletedBorrower,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting borrower", error: error.message });
  }
};
