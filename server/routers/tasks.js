const { Router } = require('express');

const taskController = require('../controllers/taskController');

const authenticator = require('../middleware/authenticator');
const taskRouter = Router();

taskRouter.get('/', authenticator, taskController.index);
taskRouter.get('/:id', authenticator, taskController.show);
taskRouter.post('/', authenticator, taskController.create);
taskRouter.patch('/:id', authenticator, taskController.update);
taskRouter.delete('/:id', authenticator, taskController.destroy);
taskRouter.get('/date/:date', authenticator, taskController.showByDate);

module.exports = taskRouter;
