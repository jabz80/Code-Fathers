const db = require("../database/connect")

class Note {
    constructor(data) {
        this.id = data.note_id;
        this.user_id = data.user_id;
        this.title = data.title;
        this.note = data.note;
        this.created = data.created_at;
        this.updated = data.updated_at;
    }

    static async getAll() {
        const response = await db.query("SELECT * from notes");
        if (response.rows.length === 0) {
            throw new Error("No notes available.")
        }
        return response.rows.map(g => new Note(g));
    }


    static async getOneById(id) {
        const response = await db.query("SELECT * FROM notes WHERE note_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate note.")
        }

        return new Note(response.rows[0]);
    }

    static async create(data) {
        const { user_id, title, note, created_at, updated_at } = data;
        const response = await db.query("INSERT INTO notes (user_id, title, note, created_at, updated_at) VALUES ($1, $2) RETURNING *;", [user_id, title, note, created_at, updated_at]);

        return new Note(response.rows[0])
    }

    static async update(data, id) {
        const date = new Date().toDateString();
        const { user_id, title, note, updated_at } = data;
        const response = await db.query("UPDATE notes SET user_id = $1, title = $2, note = $3, updated_at = $4 WHERE note_id = $5 RETURNING *;",
            [user_id, title, note, date ,id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update note")
        }
        return new Note(response.rows[0]);
    }
    static async destroy(id) {

        const response = await db.query("DELETE FROM notes WHERE note_id = $1 RETURNING *;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete note from notes table.")
        }
        return new Note(response.rows[0]);
    }
}

module.exports = Note
