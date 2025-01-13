const { Schema, model } = require("mongoose");

const TodoSchema = new Schema(
  {
    text: { type: String, required: true },
    complete: { type: Boolean, default: false },
    category: { type: String, default: "General" },
  },
  { collection: "todos" }
);

module.exports = model("Todo", TodoSchema);
