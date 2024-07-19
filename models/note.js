const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    color: { type: String, default: "white" },
    isArchived: { type: Boolean, default: false },
    isTrashed: { type: Boolean, default: false },
    reminder: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
