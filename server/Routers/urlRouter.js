const express = require('express');
const router = express.Router();
router.get('/:shortUrl',require('../Controller/redirct'));
router.post('/',require('../Controller/createUrl'));
module.exports = router;