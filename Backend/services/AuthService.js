const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/app');

class AuthService {
    static async login(username, password) {
        const user = await User.findOne({ where: { username } });
        if (!user || !bcrypt.compareSync(password, user.Passwd)) {
            throw new Error('Credenciales incorrectas');
        }

        const token = jwt.sign({ userId: user.IdUser }, config.jwtSecret, {
            expiresIn: '1h',
        });

        return {
            token,
            user: {
                id: user.IdUser,
                username: user.Username,
            },
        };
    }

    static async getCurrentUser(token) {
        if (!token) {
            throw new Error('No token provided');
        }

        const decoded = jwt.verify(token, config.jwtSecret);
        const userId = decoded.userId;
        
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        return {
            id: user.IdUser,
            username: user.Username,
        };
    }
}

module.exports = AuthService;