const express = require("express");
const router = express.Router();
const {
  getEntries,
  postEntries,
  delEntries,
} = require("../controllers/entriesController");

router.get("/", getEntries).post("/", postEntries);

router.delete("/:id", delEntries);

module.exports = router;
