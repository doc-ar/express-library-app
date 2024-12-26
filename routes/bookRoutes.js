const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookControllers.js");

router.get("/", bookController.getAllBooks);
router.post("/", bookController.createBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
