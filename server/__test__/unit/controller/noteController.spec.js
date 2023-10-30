const NoteController = require('../../../controllers/note');
const Note = require('../../../models/Note');
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

describe('Note Controller', () => {
  describe('index', () => {
    it('successfully gets Notes and displays the 200 status code', async () => {
      const mockNotes = [
        new Note({
          id: 1,
          user_id: 1,
          title: 'Note 1',
          context: 'This is the content of Note 1',
          created: '2023-10-30T00:00:00.000Z',
          updated: '2023-10-30T00:00:00.000Z',
        }),
        new Note({
          id: 2,
          user_id: 1,
          title: 'Note 2',
          context: 'This is the content of Note 2',
          created: '2023-10-28T23:00:00.000Z',
          updated: '2023-10-28T23:00:00.000Z',
        }),
        new Note({
          id: 3,
          user_id: 1,
          title: 'Note 3',
          context: 'This is the content of Note 3',
          created: '2023-10-27T23:00:00.000Z',
          updated: '2023-10-27T23:00:00.000Z',
        }),
      ];
      // Mock the Note.getAll method to resolve with mockNotes
      jest.spyOn(Note, 'getAll').mockResolvedValue(mockNotes);
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await NoteController.index(req, res);

      // Expectations
      expect(res.status).toHaveBeenCalledWith(200); // Should set status code to 200
      expect(res.json).toHaveBeenCalledWith(mockNotes);
    });

    it('fails to gets Notes and displays the 500 status code and error message', async () => {
      jest
        .spyOn(Note, 'getAll')
        .mockRejectedValue(new Error('No notes available.'));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await NoteController.index(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'No notes available.' });
    });
  });

  describe('show', () => {
    it('gets id from params and successfully gets Note, displaying the 200 status code', async () => {
      const mockNotes = new Note({
        id: 36,
        user_id: 1,
        title: 'Note 3',
        context: 'This is the content of Note 3',
        created: '2023-10-27T23:00:00.000Z',
        updated: '2023-10-27T23:00:00.000Z',
      });

      // Mock the Note.getAll method to resolve with mockNotes
      jest.spyOn(Note, 'getOneById').mockResolvedValue(mockNotes);
      const req = {
        params: { id: '36' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await NoteController.show(req, res);

      // Expectations
      expect(res.status).toHaveBeenCalledWith(200); // Should set status code to 200
      expect(res.json).toHaveBeenCalledWith(mockNotes);
    });

    it('fails to gets Notes and displays the 404 status code', async () => {
      jest
        .spyOn(Note, 'getOneById')
        .mockRejectedValue(new Error('Unable to locate Note.'));

      const req = {
        params: { id: '999' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await NoteController.show(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Unable to locate Note.',
      });
    });
  });

  describe('create', () => {
    it('successfully creates Note and displays the 201 status code', async () => {
      const newNoteData = {
        user_id: '5',
        title: 'update test',
        context: 'This has been updated',
      };

      const mockCreatedNote = new Note({
        Note_id: 22, // Adjust the Note_id as needed
        ...newNoteData,
      });

      jest.spyOn(Note, 'create').mockResolvedValue(mockCreatedNote);

      const req = {
        body: newNoteData,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await NoteController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(mockCreatedNote);
    });

    it('fails to create Note and displays the 400 status code', async () => {
      jest.spyOn(Note, 'create').mockRejectedValue(new Error('Invalid data'));

      // Create a mock request object with invalid data (e.g., missing required fields)
      const req = {
        body: {},
      };

      // Create a mock response object
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await NoteController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid data' });
    });
  });

  describe('update', () => {
    it('successfully updates Note and displays the 200 status code', async () => {
      const updatedNoteData = {
        user_id: '5',
        title: 'update test',
        context: 'This has been updated',
      };

      const mockUpdatedNote = new Note({
        Note_id: 21, // Adjust the Note_id as needed
        ...updatedNoteData,
      });

      jest.spyOn(Note, 'getOneById').mockResolvedValue(mockUpdatedNote);
      jest.spyOn(mockUpdatedNote, 'update').mockResolvedValue(mockUpdatedNote);

      const req = {
        params: { id: '21' },
        body: updatedNoteData,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await NoteController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedNote);
    });

    it('ID not found so fails to updates Note and displays the 404 status code', async () => {
      jest
        .spyOn(Note, 'getOneById')
        .mockRejectedValue(new Error('Note not found'));
      const req = {
        params: { id: '999' }, // Assuming 'id' is a string, just like it comes from request params
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await NoteController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Note not found' });
    });

    it('fails to updates Note and displays the 404 status code', async () => {
      const mockExistingNote = new Note({
        id: 21,
        user_id: 1,
        title: 'Note 1',
        context: 'This is the content of Note 1',
        created: '2023-10-30T00:00:00.000Z',
        updated: '2023-10-30T00:00:00.000Z',
      });

      jest.spyOn(Note, 'getOneById').mockResolvedValue(mockExistingNote);

      jest
        .spyOn(mockExistingNote, 'update')
        .mockRejectedValue(new Error('Unable to update Note.'));

      const req = {
        params: { id: '21' }, // Assuming 'id' is a string, just like it comes from request params
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await NoteController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Unable to update Note.',
      });
    });
  });

  describe('destroy', () => {
    it('successfully deletes Note and displays the 204 status code', async () => {
      const mockNote = new Note({
        id: 21,
        user_id: 1,
        title: 'Note 3',
        context: 'This is the content of Note 3',
        created: '2023-10-27T23:00:00.000Z',
        updated: '2023-10-27T23:00:00.000Z',
      });

      jest.spyOn(Note, 'getOneById').mockResolvedValue(mockNote);
      jest.spyOn(mockNote, 'destroy').mockResolvedValue(mockNote);

      const req = {
        params: { id: '21' }, // Assuming 'id' is a string, just like it comes from request params
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
      };

      await NoteController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.end).toHaveBeenCalled();
    });

    it('fails to delete Note and displays the 404 status code', async () => {
      jest
        .spyOn(Note, 'getOneById')
        .mockRejectedValue(new Error('Note not found'));

      const req = {
        params: { id: '999' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
        json: jest.fn(),
      };

      await NoteController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Note not found' });
    });
  });
});
