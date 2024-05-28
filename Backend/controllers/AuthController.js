const { validationResult } = require('express-validator');
const AuthService = require('../services/AuthService');

class AuthController {
    static async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            const { token, user } = await AuthService.login(username, password);
            res.json({ token, user });
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: error.message });
        }
    }

    static async getCurrentUser(req, res) {
        const token = req.headers.authorization?.split(' ')[1];
        
        try {
            const user = await AuthService.getCurrentUser(token);
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: error.message });
        }
    }
}

module.exports = AuthController;
