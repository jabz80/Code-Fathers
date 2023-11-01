const { Router } = require('express');

const authenticator = require('../middleware/authenticator');
const noteController = require('../controllers/note');

const noteRouter = Router();

noteRouter.get('/', authenticator, noteController.index);
noteRouter.get('/:id', authenticator, noteController.show);
noteRouter.post('/', authenticator, noteController.create);
noteRouter.patch('/:id', authenticator, noteController.update);
noteRouter.delete('/:id', authenticator, noteController.destroy);
noteRouter.post('/show/user_id', noteController.showAllForUser);

module.exports = noteRouter;
