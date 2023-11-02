const db = require('../database/connect');

class Task {
  constructor(data) {
    this.task_id = data.task_id;
    this.user_id = data.user_id;
    this.task_title = data.task_title;
    this.task_description = data.task_description;
    this.task_date = data.task_date;
  }

  static async getAll() {
    const response = await db.query('SELECT * from tasks');
    if (response.rows.length === 0) {
      throw new Error('No tasks available.');
    }
    return response.rows.map((g) => new Task(g));
  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM tasks WHERE task_id = $1;', [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error('Unable to locate task.');
    }

    return new Task(response.rows[0]);
  }

  static async getByDate(year, month, day, userID){
    const response = await db.query("SELECT * FROM tasks WHERE EXTRACT(YEAR FROM task_date)=$1 AND EXTRACT(MONTH FROM task_date)=$2 AND EXTRACT(DAY FROM task_date)=$3 AND user_id=$4;", [year, month, day, userID])
    if (response.rows.length === 0) {
      throw new Error('No tasks available.');
    }
    return response.rows.map((g) => new Task(g));
  }

  static async create(data) {
    const { user_id, task_title, task_description, task_date } = data;
    const response = await db.query(
      'INSERT INTO tasks (user_id, task_title, task_description, task_date) VALUES ($1, $2, $3, $4) RETURNING *;',
      [user_id, task_title, task_description, task_date]
    );

    return new Task(response.rows[0]);
  }

  async update(data) {
    const { user_id, task_title, task_description, task_date } = data;
    const response = await db.query(
      'UPDATE tasks SET user_id = $1, task_title = $2, task_description = $3, task_date = $4 WHERE task_id = $5 RETURNING *;',
      [user_id, task_title, task_description, task_date, this.task_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to update task.');
    }
    return new Task(response.rows[0]);
  }

  async destroy() {
    const response = await db.query(
      'DELETE FROM tasks WHERE task_id = $1 RETURNING *;',
      [this.task_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to delete task from tasks table.');
    }
    return new Task(response.rows[0]);
  }

  

}

module.exports = Task;
