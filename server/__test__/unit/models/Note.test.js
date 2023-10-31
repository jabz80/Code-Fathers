const Note = require('../../../models/Note');
const db = require('../../../database/connect');
const request = require('supertest');
const app = require('../../../app');

//ORDER OF THE TESTS MATTER
describe('Task', () => {
  describe('update', () => {
    it('Updates a task', async () => {
      const newNoteData = {
        user_id: '5',
        title: 'update test',
        context: 'This has been updated',
      };
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            id: 42,
            user_id: 1,
            title: 'Note 3',
            context: 'This is the content of Note 3',
            created: '2023-10-27T23:00:00.000Z',
            updated: '2023-10-27T23:00:00.000Z',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            id: 42,
            ...newNoteData,
          },
        ],
      });
      //not static so need an instance
      const note = await Note.getOneById(42);
      const updatedNote = await note.update(newNoteData);
      expect(updatedNote).toBeInstanceOf(Note); // Check if it's an instance of the Skill class.
      expect(updatedNote.context).toBe('This has been updated');
    });

    it('throws an error', async () => {
      const newNoteData = {
        user_id: '5',
        title: 'update test',
        context: 'This has been updated',
      };

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            id: 42,
            user_id: 1,
            title: 'Note 3',
            context: 'This is the content of Note 3',
            created: '2023-10-27T23:00:00.000Z',
            updated: '2023-10-27T23:00:00.000Z',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [],
      });
      //not static so need an instance

      try {
        const getNoteById = await Note.getOneById(42);
        const updatedNote = await getNoteById.update(newNoteData);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to update note.');
      }
    });
  });

  describe('destroy', () => {
    it('Deletes a note', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            id: 42,
            user_id: 1,
            title: 'Note 3',
            context: 'This is the content of Note 3',
            created: '2023-10-27T23:00:00.000Z',
            updated: '2023-10-27T23:00:00.000Z',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            id: 42,
            user_id: 1,
            title: 'Note 3',
            context: 'This is the content of Note 3',
            created: '2023-10-27T23:00:00.000Z',
            updated: '2023-10-27T23:00:00.000Z',
          },
        ],
      });
      //not static so need an instance

      const note = await Note.getOneById(42);
      const deletedNote = await note.destroy();
      expect(deletedNote).toBeInstanceOf(Note);
      expect(deletedNote.context).toBe('This is the content of Note 3');
    });
  });

  describe('getAll', () => {
    it('resolves with Notes on successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            user_id: 1,
            title: 'Note 1',
            context: 'This is the content of Note 1',
            created: '2023-10-30T00:00:00.000Z',
            updated: '2023-10-30T00:00:00.000Z',
          },
          {
            id: 2,
            user_id: 1,
            title: 'Note 2',
            context: 'This is the content of Note 2',
            created: '2023-10-28T23:00:00.000Z',
            updated: '2023-10-28T23:00:00.000Z',
          },
          {
            id: 3,
            user_id: 1,
            title: 'Note 3',
            context: 'This is the content of Note 3',
            created: '2023-10-27T23:00:00.000Z',
            updated: '2023-10-27T23:00:00.000Z',
          },
        ],
      });

      const notes = await Note.getAll();
      expect(notes).toHaveLength(3);
      expect(notes[0]).toHaveProperty('id');
    });

    it('should throw an Error on db query error', async () => {
      // jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))

      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      try {
        await Note.getAll();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('No notes available.');
      }
    });
  });

  describe('getOneById', () => {
    it('resolves with 1 record when successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            id: 4,
            user_id: 1,
            title: 'Note 1',
            context: 'This is the content of Note 1',
            created: '2023-10-30T00:00:00.000Z',
            updated: '2023-10-30T00:00:00.000Z',
          },
        ],
      });

      const note = await Note.getOneById(4);
      expect(note).toHaveProperty('context');
    });

    it('should throw an error (length of respose != 1)', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            user_id: 1,
            title: 'Note 1',
            context: 'This is the content of Note 1',
            created: '2023-10-30T00:00:00.000Z',
            updated: '2023-10-30T00:00:00.000Z',
          },
          {
            id: 2,
            user_id: 1,
            title: 'Note 2',
            context: 'This is the content of Note 2',
            created: '2023-10-28T23:00:00.000Z',
            updated: '2023-10-28T23:00:00.000Z',
          },
          {
            id: 3,
            user_id: 1,
            title: 'Note 3',
            context: 'This is the content of Note 3',
            created: '2023-10-27T23:00:00.000Z',
            updated: '2023-10-27T23:00:00.000Z',
          },
        ],
      });

      try {
        await Note.getOneById(3);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to locate note.');
      }
    });
  });

  describe('create', () => {
    //jest.mock("../../../database/connect");
    it('creates a new note and returns it', async () => {
      // Create a mock data object
      const newNoteData = {
        user_id: '5',
        title: 'update test',
        context: 'This has been updated',
      };

      // Mock the database query
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            id: 33,
            ...newNoteData,
          },
        ],
      });

      // Call the create function and await the result.
      const createdNote = await Note.create(newNoteData);

      // Expectations:
      expect(createdNote).toBeInstanceOf(Note);
      expect(createdNote.context).toBe('This has been updated');
    });
  });
});
