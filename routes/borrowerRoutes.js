const express = require("express");
const router = express.Router();
const borrowerController = require("../controllers/borrowerControllers.js");

router.get("/", borrowerController.getAllBorrowers);
router.post("/", borrowerController.createBorrower);
router.put("/:id", borrowerController.updateBorrower);
router.delete("/:id", borrowerController.deleteBorrower);

module.exports = router;
