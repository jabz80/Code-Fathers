const Token = require('../../../models/token');
const db = require('../../../database/connect');
const request = require('supertest');
const app = require('../../../app');

//ORDER OF THE TESTS MATTER
describe('Token', () => {
  describe('getOneById', () => {
    it('resolves with 1 record when successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            token_id: 4,
            user_id: 'User 29',
            token: 'Token12345',
          },
        ],
      });

      const token = await Token.getOneById(4);

      expect(token).toHaveProperty('token_id');
    });

    it('should throw an error (length of respose != 1)', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            token_id: 4,
            user_id: 'User 29',
            token: 'Token12345',
          },
          {
            token_id: 17,
            user_id: 'User 2221',
            token: 'Token12345',
          },
          {
            token_id: 23,
            user_id: 'User 49',
            token: 'Token12345',
          },
        ],
      });

      try {
        await Token.getOneById(23);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to locate token.');
      }
    });
  });

  describe('getOneByToken', () => {
    it('resolves with 1 record when successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            token_id: 4,
            user_id: 'User 29',
            token: 'Token12345',
          },
        ],
      });

      const token = await Token.getOneByToken('Token 4');
      //defined id and not Token id in model constructor
      expect(token).toHaveProperty('token_id');
    });

    it('should throw an error (length of respose != 1)', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            token_id: 4,
            user_id: 'User 29',
            token: 'Token12345',
          },
          {
            token_id: 17,
            user_id: 'User 2221',
            token: 'Token12345',
          },
          {
            token_id: 23,
            user_id: 'User 49',
            token: 'Token12345',
          },
        ],
      });

      try {
        await Token.getOneByToken(4);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to locate token.');
      }
    });
  });

  describe('create', () => {
    //jest.mock("../../../database/connect");
    it('creates a new Token and returns it', async () => {
      // Create a mock data object for the new Skill.

      // Mock the database query
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            token_id: 4,
            user_id: 'User 29',
            token: 'Token12345',
          },
        ],
      });
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            token_id: 4,
            user_id: 'User 29',
            token: 'Token12345',
          },
        ],
      });

      // Call the create function and await the result.
      const createdToken = await Token.create('User 29');

      // Expectations:
      expect(createdToken).toBeInstanceOf(Token);
      expect(createdToken.token_id).toBe(4);
    });
  });
});
