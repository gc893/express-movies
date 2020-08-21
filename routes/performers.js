const express = require('express');
const router = express.Router();
const performersCtrl = require('../controllers/performers');


router.get('/new', performersCtrl.new);
router.post('/', performersCtrl.create);
router.post('/movies/:id/performers', performersCtrl.addToCast)


module.exports = router;