const Note = require("../models/note");

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id, isTrashed: false });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getArchivedNotes = async (req, res) => {
  try {
    const archivedNotes = await Note.find({
      userId: req.user._id,
      isArchived: true,
      isTrashed: false,
    });
    res.json(archivedNotes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createNote = async (req, res) => {
  const { title, content, tags, color, reminder } = req.body;
  try {
    const note = await Note.create({
      userId: req.user._id,
      title,
      content,
      tags,
      color,
      reminder,
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (note && note.userId.toString() === req.user._id.toString()) {
      const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedNote);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (note && note.userId.toString() === req.user._id.toString()) {
      await Note.findByIdAndDelete(id);
      res.json({ message: "Note removed" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const archiveNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (note && note.userId.toString() === req.user._id.toString()) {
      note.isArchived = !note.isArchived;
      await note.save();
      res.json(note);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const trashNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (note && note.userId.toString() === req.user._id.toString()) {
      note.isTrashed = !note.isTrashed;
      await note.save();
      res.json(note);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getNotes,
  getArchivedNotes,
  createNote,
  updateNote,
  deleteNote,
  archiveNote,
  trashNote,
};
