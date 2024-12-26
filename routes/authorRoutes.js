const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorControllers.js");

router.get("/", authorController.getAllAuthors);
router.post("/", authorController.createAuthor);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;
