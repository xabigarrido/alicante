import Task from "../models/task.model.js";
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).populate("user");
  res.json(tasks);
};
export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({ title, description, user: req.user.id });
  newTask.save();
  res.json(newTask);
};
export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id).populate("user");
  if (!task) return res.status(404).send("tarea no encontrada");
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).send("Tarea no encontrada");
  res.status(204).json(task);
};
export const updateTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { new: true }
  );
  res.json(task);
};
