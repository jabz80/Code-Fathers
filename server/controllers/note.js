const Note = require('../models/Note.js');

async function index(req, res) {
  try {
    const notes = await Note.getAll();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const note = await Note.getOneById(id);
    res.status(200).json(note);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

const create = async (req, res) => {
  try {
    const data = req.body;
    const newNote = await Note.create(data);
    res.status(201).send(newNote);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const noteToUpdate = await Note.getOneById(id);
    // req.body.user_id ||= noteToUpdate.user_id
    // req.body.title ||= noteToUpdate.title
    // req.body.context ||= noteToUpdate.context
    // req.body.created_at ||= noteToUpdate.created_at
    // req.body.updated_at ||= noteToUpdate.updated_at

    const updatedNote = await noteToUpdate.update(data);
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}
async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);
    const note = await Note.getOneById(id);
    const destroy = await note.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { index, show, create, update, destroy };
