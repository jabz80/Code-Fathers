const db = require('../database/connect');

class Note {
  constructor(data) {
    this.id = data.note_id;
    this.user_id = data.user_id;
    this.title = data.title;
    this.context = data.context;
    this.created = data.created_at;
    this.updated = data.updated_at;
  }

  static async getAll() {
    const response = await db.query('SELECT * from Notes');
    if (response.rows.length === 0) {
      throw new Error('No notes available.');
    }
    return response.rows.map((g) => new Note(g));
  }

  static async getAllByUser({ user_id }) {
    const response = await db.query(
      'SELECT * from Notes WHERE user_id = $1 ;',
      [user_id]
    );
    if (response.rows.length === 0) {
      throw new Error('No notes available.');
    }
    return response.rows.map((g) => new Note(g));
  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM Notes WHERE note_id = $1;', [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error('Unable to locate note.');
    }

    return new Note(response.rows[0]);
  }

  static async create(data) {
    const date = new Date().toDateString();
    const { user_id, title, context, updated_at } = data;
    const response = await db.query(
      'INSERT INTO Notes (user_id, title, context, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [user_id, title, context, date, updated_at]
    );

    return new Note(response.rows[0]);
  }

  async update(data) {
    const date = new Date().toDateString();
    const { user_id, title, context } = data;
    const response = await db.query(
      'UPDATE Notes SET user_id = $1, title = $2, context = $3, updated_at = $4 WHERE note_id = $5 RETURNING *;',
      [user_id, title, context, date, this.id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to update note.');
    }
    return new Note(response.rows[0]);
  }

  async destroy() {
    const response = await db.query(
      'DELETE FROM Notes WHERE note_id = $1 RETURNING *;',
      [this.id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to delete note from notes table.');
    }
    return new Note(response.rows[0]);
  }
}

module.exports = Note;
