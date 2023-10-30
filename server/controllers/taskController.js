const Task = require('../models/Task.js');

async function index(req, res) {
  try {
    const tasks = await Task.getAll();
    res.status(200).send({ data: tasks });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const task = await Task.getOneById(id);
    res.status(200).send({ data: task });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
}

const create = async (req, res) => {
  try {
    const data = req.body;
    const newTask = await Task.create(data);
    res.status(201).send({ data: newTask });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const task = await Task.getOneById(id);
    const result = await task.update(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}
async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);
    const task = await Task.getOneById(id);
    const destroy = await task.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { index, show, create, update, destroy };