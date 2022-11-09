const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const newTask = new Task({ name: req.body.name });
  const task = await Task.create(newTask);
  res.status(201).json({ sucess: true, data: { task, amount: task.length } });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const data = req.body;

  const task = await Task.findOneAndUpdate({ _id: taskID }, data, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res
      .status(404)
      .json({ message: `No task with matching ID ${taskID}` });
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res
      .status(404)
      .json({ message: `No task with matching ID ${taskID}` });
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
