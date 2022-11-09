const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, "Must provide name"],
    trim: true,
    default: "Test",
  },
  completed: { type: Boolean, default: false },
});

const taskModel = model("Task", taskSchema);

module.exports = taskModel;
