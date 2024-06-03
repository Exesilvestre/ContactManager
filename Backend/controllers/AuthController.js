const { validationResult } = require('express-validator');
const AuthService = require('../services/AuthService');

class AuthController {
    static async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, password } = req.body;
            const { token, user } = await AuthService.login(username, password);

            res.json({ token, user });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    }

    static async getCurrentUser(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new Error('No se proporcionó un token');
            }

            const user = await AuthService.getCurrentUser(token);
            res.json(user);
        } catch (error) {
            console.error('Error retrieving current user:', error);
            res.status(401).json({ message: error.message });
        }
    }
}

module.exports = AuthController;
