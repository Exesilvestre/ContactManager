const { Session } = require('../base-orm/sequelize-init');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();


router.post('/api/session', async (req, res) => {
    try {
        console.log("no llego")
        const sessionId = uuidv4();
        const createdAt = new Date();
        const userId = req.userId

        const session = await db.Session.create({
            SessionId: sessionId,
            UserId: userId,
            CreatedAt: createdAt
        });

        // Envía la respuesta con sessionId y createdAt
        res.status(200).json({
            success: true,
            sessionId,
            createdAt
        });
    } catch (error) {
        console.error('Error creating session:', error.message);
        throw error;
    }
})

module.exports = router;