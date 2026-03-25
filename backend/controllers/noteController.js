const pool = require('../db/db');

exports.createNote = async (req, res) => {
  const { title, content } = req.body;

  const result = await pool.query(
    'INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
    [title, content, req.user.id]
  );

  res.json(result.rows[0]);
};

exports.getNotes = async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM notes WHERE user_id=$1',
    [req.user.id]
  );

  res.json(result.rows);
};

exports.deleteNote = async (req, res) => {
  await pool.query(
    'DELETE FROM notes WHERE id=$1',
    [req.params.id]
  );

  res.json({ message: "Deleted" });
};