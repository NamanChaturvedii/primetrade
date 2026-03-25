const router = require('express').Router();
const auth = require('../middleware/auth');
const { createNote, getNotes, deleteNote } = require('../controllers/noteController');

router.post('/', auth, createNote);
router.get('/', auth, getNotes);
router.delete('/:id', auth, deleteNote);

module.exports = router;