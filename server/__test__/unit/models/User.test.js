const User = require('../../../models/User');
const db = require('../../../database/connect');
const request = require('supertest');
const app = require('../../../app');

//ORDER OF THE TESTS MATTER
describe('User', () => {
  describe('getOneById', () => {
    it('resolves with 1 record when successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            user_id: 4,
            username: 'User 4',
            password: 'HashedPassword12345',
            name: 'Bob The Builder',
          },
        ],
      });

      const user = await User.getOneById(4);
      //defined id and not user id in model constructor
      expect(user).toHaveProperty('id');
    });

    it('should throw an error (length of respose != 1)', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            user_id: 4,
            username: 'User 4',
            password: 'HashedPassword12345',
            name: 'Bob The Builder',
          },
          {
            user_id: 5,
            username: 'User 5',
            password: 'HashedPassword12345',
            name: 'Bob The Builder',
          },
          {
            user_id: 7,
            username: 'User 7',
            password: 'HashedPassword12345',
            name: 'Bob The Builder',
          },
        ],
      });

      try {
        await User.getOneById(3);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to locate user.');
      }
    });
  });

  describe('getOneByUsername', () => {
    it('resolves with 1 record when successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            user_id: 4,
            username: 'User 4',
            password: 'HashedPassword12345',
            name: 'Bob The Builder',
          },
        ],
      });

      const user = await User.getOneByUsername('User 4');
      //defined id and not user id in model constructor
      expect(user).toHaveProperty('id');
    });

    it('should throw an error (length of respose != 1)', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            user_id: 4,
            username: 'User 4',
            password: 'HashedPassword12345',
            name: 'Bob The Builder',
          },
          {
            user_id: 5,
            username: 'User 5',
            password: 'HashedPassword12345',
            name: 'Bob The Builder',
          },
          {
            user_id: 7,
            username: 'User 7',
            password: 'HashedPassword12345',
            name: 'Bob The Builder',
          },
        ],
      });

      try {
        await User.getOneByUsername('User 7');
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to locate user.');
      }
    });
  });

  describe('create', () => {
    //jest.mock("../../../database/connect");
    it('creates a new User and returns it', async () => {
      // Create a mock data object for the new Skill.
      const newUserData = {
        username: 'Bob123',
        password: 'HashedPassword12345',
        name: 'Bob The Builder',
      };

      // Mock the database query
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            id: 33,
            ...newUserData,
          },
        ],
      });
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            id: 33,
            ...newUserData,
          },
        ],
      });

      // Call the create function and await the result.
      const createdUser = await User.create(newUserData);

      // Expectations:
      expect(createdUser).toBeInstanceOf(User);
      expect(createdUser.password).toBe('HashedPassword12345');
    });
  });
});
