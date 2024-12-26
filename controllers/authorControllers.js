const Author = require("../models/authorModel.js");

exports.createAuthor = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;

    const newAuthor = new Author({ name, email, phoneNumber });
    await newAuthor.save();

    res
      .status(201)
      .json({ message: "Author created successfully", author: newAuthor });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding author", error: error.message });
  }
};

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();

    res.status(200).json(authors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching authors", error: error.message });
  }
};

exports.updateAuthor = async (req, res) => {
  const { name, email, phoneNumber } = req.body;

  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      { name, email, phoneNumber },
      { new: true, runValidators: true }, // Ensures fields are validated
    );

    if (!updatedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    res
      .status(200)
      .json({ message: "Author updated successfully", author: updatedAuthor });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating author", error: error.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);

    if (!deletedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    res
      .status(200)
      .json({ message: "Author deleted successfully", author: deletedAuthor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting author", error: error.message });
  }
};
