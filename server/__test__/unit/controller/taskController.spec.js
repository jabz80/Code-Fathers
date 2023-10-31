const TaskController = require('../../../controllers/taskController');
const Task = require('../../../models/Task');
const db = require('../../../database/connect');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd,
}));
const mockRes = { status: mockStatus };

describe('Task Controller', () => {
  describe('index', () => {
    it('successfully gets Tasks and displays the 200 status code', async () => {
      const mockTasks = [
        new Task({
          task_id: 1,
          user_id: 1,
          task_title: 'Task 1',
          task_description: 'Description for Task 1',
          task_date: '2023-11-15T00:00:00.000Z',
        }),
        new Task({
          task_id: 2,
          user_id: 1,
          task_title: 'Task 2',
          task_description: 'Description for Task 2',
          task_date: '2023-11-20T00:00:00.000Z',
        }),
        new Task({
          task_id: 3,
          user_id: 1,
          task_title: 'Task 3',
          task_description: 'Description for Task 3',
          task_date: '2023-11-25T00:00:00.000Z',
        }),
      ];
      // Mock the Task.getAll method to resolve with mockTasks
      jest.spyOn(Task, 'getAll').mockResolvedValue(mockTasks);
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await TaskController.index(req, res);

      // Expectations
      expect(res.status).toHaveBeenCalledWith(200); // Should set status code to 200
      expect(res.json).toHaveBeenCalledWith(mockTasks);
    });

    it('fails to gets Tasks and displays the 500 status code and error message', async () => {
      jest
        .spyOn(Task, 'getAll')
        .mockRejectedValue(new Error('No tasks available.'));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await TaskController.index(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'No tasks available.' });
    });
  });

  describe('show', () => {
    it('gets id from params and successfully gets Task, displaying the 200 status code', async () => {
      const mockTasks = new Task({
        task_id: 36,
        user_id: 1,
        task_title: 'Task 1',
        task_description: 'Description for Task 1',
        task_date: '2023-11-15T00:00:00.000Z',
      });

      // Mock the Task.getAll method to resolve with mockTasks
      jest.spyOn(Task, 'getOneById').mockResolvedValue(mockTasks);
      const req = {
        params: { id: '36' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await TaskController.show(req, res);

      // Expectations
      expect(res.status).toHaveBeenCalledWith(200); // Should set status code to 200
      expect(res.json).toHaveBeenCalledWith(mockTasks);
    });

    it('fails to gets Tasks and displays the 404 status code', async () => {
      jest
        .spyOn(Task, 'getOneById')
        .mockRejectedValue(new Error('Unable to locate task.'));

      const req = {
        params: { id: '999' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await TaskController.show(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Unable to locate task.',
      });
    });
  });

  describe('create', () => {
    it('successfully creates Task and displays the 201 status code', async () => {
      const newTaskData = {
        user_id: '1',
        task_title: 'project',
        task_description: 'create an app',
        task_date: '2020-12-29',
      };

      const mockCreatedTask = new Task({
        Task_id: 22, // Adjust the Task_id as needed
        ...newTaskData,
      });

      jest.spyOn(Task, 'create').mockResolvedValue(mockCreatedTask);

      const req = {
        body: newTaskData,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await TaskController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(mockCreatedTask);
    });

    it('fails to create Task and displays the 400 status code', async () => {
      jest.spyOn(Task, 'create').mockRejectedValue(new Error('Invalid data'));

      // Create a mock request object with invalid data (e.g., missing required fields)
      const req = {
        body: {},
      };

      // Create a mock response object
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await TaskController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid data' });
    });
  });

  describe('update', () => {
    it('successfully updates Task and displays the 200 status code', async () => {
      const updatedTaskData = {
        user_id: '1',
        task_title: 'project',
        task_description: 'create an app',
        task_date: '2020-12-29',
      };

      const mockUpdatedTask = new Task({
        Task_id: 21, // Adjust the Task_id as needed
        ...updatedTaskData,
      });

      jest.spyOn(Task, 'getOneById').mockResolvedValue(mockUpdatedTask);
      jest.spyOn(mockUpdatedTask, 'update').mockResolvedValue(mockUpdatedTask);

      const req = {
        params: { id: '21' },
        body: updatedTaskData,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await TaskController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedTask);
    });

    it('ID not found so fails to updates Task and displays the 404 status code', async () => {
      jest
        .spyOn(Task, 'getOneById')
        .mockRejectedValue(new Error('Task not found'));
      const req = {
        params: { id: '999' }, // Assuming 'id' is a string, just like it comes from request params
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await TaskController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Task not found' });
    });

    it('fails to updates Task and displays the 404 status code', async () => {
      const mockExistingTask = new Task({
        user_id: '1',
        task_title: 'project',
        task_description: 'create an app',
        task_date: '2020-12-29',
      });

      jest.spyOn(Task, 'getOneById').mockResolvedValue(mockExistingTask);

      jest
        .spyOn(mockExistingTask, 'update')
        .mockRejectedValue(new Error('Unable to update Task.'));

      const req = {
        params: { id: '21' }, // Assuming 'id' is a string, just like it comes from request params
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await TaskController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Unable to update Task.',
      });
    });
  });

  describe('destroy', () => {
    it('successfully deletes Task and displays the 204 status code', async () => {
      const mockTask = new Task({
        task_id: '21',
        user_id: '1',
        task_title: 'project',
        task_description: 'create an app',
        task_date: '2020-12-29',
      });

      jest.spyOn(Task, 'getOneById').mockResolvedValue(mockTask);
      jest.spyOn(mockTask, 'destroy').mockResolvedValue(mockTask);

      const req = {
        params: { id: '21' }, // Assuming 'id' is a string, just like it comes from request params
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
      };

      await TaskController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.end).toHaveBeenCalled();
    });

    it('fails to delete Task and displays the 404 status code', async () => {
      jest
        .spyOn(Task, 'getOneById')
        .mockRejectedValue(new Error('Task not found'));

      const req = {
        params: { id: '999' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
        json: jest.fn(),
      };

      await TaskController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Task not found' });
    });
  });
});
