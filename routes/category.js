const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../middleware/upload');
const controller = require('../controllers/category');

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:id',passport.authenticate('jwt', {session: false}), controller.getById);
router.delete('/:id',passport.authenticate('jwt', {session: false}), controller.remove);
router.post('/', upload.single('image'),passport.authenticate('jwt', {session: false}), controller.create); // call our upload middleware and we set that is single file
router.patch('/:id', upload.single('image'),passport.authenticate('jwt', {session: false}), controller.update);

module.exports = router