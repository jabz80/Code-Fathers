const { Router } = require('express');
const noteController = require('../controllers/note');

const noteRouter = Router();

noteRouter.get('/', noteController.index);
noteRouter.get('/:id', noteController.show);
noteRouter.post('/', noteController.create);
noteRouter.patch('/:id', noteController.update);
noteRouter.delete('/:id', noteController.destroy);

module.exports = noteRouter;
