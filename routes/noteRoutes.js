const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getNotes,
  getArchivedNotes,
  createNote,
  updateNote,
  deleteNote,
  archiveNote,
  trashNote,
} = require("../controllers/noteController");
const router = express.Router();

router.route("/").get(protect, getNotes).post(protect, createNote);

router.route("/:id").put(protect, updateNote).delete(protect, deleteNote);

router.put("/:id/archive", protect, archiveNote);
router.put("/:id/trash", protect, trashNote);

router.get("/archived", protect, getArchivedNotes);

module.exports = router;
