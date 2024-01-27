const express = require('express');
const { login, dashboard } = require('../controllers/main');

const router = express.Router();

const authMiddleware = require('../middleware/auth');

router.post('/login', login);
//every time someone hits this route they will go through auth middleware first
router.get('/dashboard', authMiddleware, dashboard);

module.exports = router;
