const Task = require('../../../models/Task');
const db = require('../../../database/connect');
const request = require('supertest');
const app = require('../../../app');

//ORDER OF THE TESTS MATTER.
//Figured out issue on why it matters. CREATE test has 2 calls being mocked which runs over
//no point changing order now
describe('Task', () => {
  describe('update', () => {
    it('Updates a task', async () => {
      const newTaskData = {
        user_id: '1',
        task_title: 'project',
        task_description: 'create an app',
        task_date: '2020-12-29',
      };

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            task_id: 42,
            user_id: 2,
            task_title: 'Task 6',
            task_description: 'Description for Task 6',
            task_date: '2023-12-10T00:00:00.000Z',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            task_id: 42,
            ...newTaskData,
          },
        ],
      });
      //not static so need an instance
      const task = await Task.getOneById(42);
      const updatedTask = await task.update(newTaskData);
      expect(updatedTask).toBeInstanceOf(Task); // Check if it's an instance of the Skill class.
      expect(updatedTask.task_title).toBe('project');
    });

    it('throws an error', async () => {
      const newTaskData = {
        user_id: '1',
        task_title: 'project',
        task_description: 'create an app',
        task_date: '2020-12-29',
      };

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            task_id: 42,
            user_id: 2,
            task_title: 'Task 6',
            task_description: 'Description for Task 6',
            task_date: '2023-12-10T00:00:00.000Z',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [],
      });
      //not static so need an instance

      try {
        const getTaskById = await Task.getOneById(42);
        const updatedTask = await getTaskById.update(newTaskData);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to update task.');
      }
    });
  });

  describe('destroy', () => {
    it('Deletes a task', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            task_id: 42,
            user_id: 2,
            task_title: 'Task 6',
            task_description: 'Description for Task 6',
            task_date: '2023-12-10T00:00:00.000Z',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            task_id: 42,
            user_id: 2,
            task_title: 'Task 6',
            task_description: 'Description for Task 6',
            task_date: '2023-12-10T00:00:00.000Z',
          },
        ],
      });
      //not static so need an instance

      const task = await Task.getOneById(42);
      const deletedTask = await task.destroy();
      expect(deletedTask).toBeInstanceOf(Task); // Check if it's an instance of the Skill class.
      expect(deletedTask.task_title).toBe('Task 6');
    });
  });

  describe('getAll', () => {
    it('resolves with Tasks on successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            task_id: 1,
            user_id: 1,
            task_title: 'Task 1',
            task_description: 'Description for Task 1',
            task_date: '2023-11-15T00:00:00.000Z',
          },
          {
            task_id: 2,
            user_id: 1,
            task_title: 'Task 2',
            task_description: 'Description for Task 2',
            task_date: '2023-11-20T00:00:00.000Z',
          },
          {
            task_id: 3,
            user_id: 1,
            task_title: 'Task 3',
            task_description: 'Description for Task 3',
            task_date: '2023-11-25T00:00:00.000Z',
          },
        ],
      });

      const Tasks = await Task.getAll();
      expect(Tasks).toHaveLength(3);
      expect(Tasks[0]).toHaveProperty('task_id');
    });

    it('should throw an Error on db query error', async () => {
      // jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))

      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      try {
        await Task.getAll();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('No tasks available.');
      }
    });
  });

  describe('getOneById', () => {
    it('resolves with 1 record when successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            task_id: 1,
            user_id: 1,
            task_title: 'Task 1',
            task_description: 'Description for Task 1',
            task_date: '2023-11-15T00:00:00.000Z',
          },
        ],
      });

      const task = await Task.getOneById(4);
      expect(task).toHaveProperty('task_id');
    });

    it('should throw an error (length of respose != 1)', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            task_id: 1,
            user_id: 1,
            task_title: 'Task 1',
            task_description: 'Description for Task 1',
            task_date: '2023-11-15T00:00:00.000Z',
          },
          {
            task_id: 2,
            user_id: 1,
            task_title: 'Task 2',
            task_description: 'Description for Task 2',
            task_date: '2023-11-20T00:00:00.000Z',
          },
          {
            task_id: 3,
            user_id: 1,
            task_title: 'Task 3',
            task_description: 'Description for Task 3',
            task_date: '2023-11-25T00:00:00.000Z',
          },
        ],
      });

      try {
        await Task.getOneById(3);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to locate task.');
      }
    });
  });

  describe('create', () => {
    //jest.mock("../../../database/connect");
    it('creates a new task and returns it', async () => {
      // Create a mock data object for the new Skill.
      const newTaskData = {
        user_id: '1',
        task_title: 'project',
        task_description: 'create an app',
        task_date: '2020-12-29',
      };

      // Mock the database query to resolve with the newly created Skill.
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            task_id: 33,
            ...newTaskData,
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            task_id: 33,
            ...newTaskData, // You can modify the data for the second call.
          },
        ],
      });

      // Call the create function and await the result.
      const createdTask = await Task.create(newTaskData);

      // Expectations:
      expect(createdTask).toBeInstanceOf(Task); // Check if it's an instance of the Skill class.
      expect(createdTask.task_id).toBe(33); // Check the skill_id property.
      // You can add more expectations to validate other properties if needed.
    });
  });
});
