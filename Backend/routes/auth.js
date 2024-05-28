const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// POST /api/login: Loguea un usuario
router.post(
    '/api/login',
    [
        check('username').not().isEmpty().withMessage('Username is required'),
        check('password').not().isEmpty().withMessage('Password is required'),
    ],
    AuthController.login
);

// GET /api/user: obtener info del usuario creado
router.get('/api/user', AuthController.getCurrentUser);

module.exports = router;
