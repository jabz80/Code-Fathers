const Task = require('../models/Task.js');

async function index(req, res) {
  try {
    const tasks = await Task.getAll();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const task = await Task.getOneById(id);
    res.status(200).json(task);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function showByDate (req, res){
  try{
    let date = (req.params.date).toString()
    if (date.length === 7) {
      date = date.substr(0, 2) + "0" + date.substr(2);
    }
    const year = date.substr(4,4)
    const month = date.substr(0,2)
    const day = date.substr(2,2)

    console.log(date, year, month, day);
    const tasks = await Task.getByDate(year, month, day);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
}

const create = async (req, res) => {
  try {
    const data = req.body;
    const newTask = await Task.create(data);
    res.status(201).send(newTask);
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

module.exports = { index, show, create, update, destroy, showByDate };
