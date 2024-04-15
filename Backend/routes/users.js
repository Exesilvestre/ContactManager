const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { User } = require('../base-orm/sequelize-init'); 

let currentUser = null;

// POST /api/Login: Loguea un usuario
router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user || !bcrypt.compareSync(password, user.Passwd)) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ userId: user.IdUser }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        const userResponse = {
            id: user.IdUser,
            username: user.Username,
        };

        currentUser = userResponse;

        res.json({ token, user: userResponse });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Log in error' });
    }
});

// GET /api/user: get the current logged user info
router.get('/api/user', (req, res) => {
    if (!currentUser) {
        return res.status(401).json({ message: 'No hay usuario logueado' });
    }

    res.json(currentUser);
});

module.exports = router;