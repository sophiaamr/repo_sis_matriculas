import { connection } from '../db/connection.js';

class UserModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  create(data, callback) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
    const values = Object.values(data);

    connection.query(query, values, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  getAll(callback) {
    const query = `SELECT * FROM ${this.tableName}`;
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  getById(id, callback) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }

  update(id, data, callback) {
    const columns = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const query = `UPDATE ${this.tableName} SET ${columns} WHERE id = ?`;
    const values = [...Object.values(data), id];

    connection.query(query, values, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  delete(id, callback) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
}

export default UserModel;
