const express = require("express");
const router = express.Router();
const miscController = require("../controllers/miscControllers.js");

router.post("/borrow", miscController.addBookToBorrower);
router.post("/return", miscController.removeBookFromBorrower);

module.exports = router;
