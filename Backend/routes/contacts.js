const express = require('express');
const router = express.Router();
const { ValidationError } = require("sequelize");
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/CloudinaryConfig');
const bcrypt = require('bcrypt');

const db = require("../base-orm/sequelize-init");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// GET /api/contacts: get lost of contacts for the logged user
router.get("/api/contacts", verifyToken, async (req, res) => {
    try {
        const contacts = await db.Contact.findAll({
            where: { UserId: req.userId },
            attributes: [
                "IdContact",
                "Name",
                "Address",
                "Cellphone",
                "ProfilePic",
            ],
            order: [["Name", "ASC"]],
        });

        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los contactos' });
    }
});

// POST /api/contacts: Create a new contact for the logged user
router.post("/api/contacts", verifyToken, async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.body.ProfilePic, {
            folder: "profile_pics",
            resource_type: "image"
        });

        let data = await db.Contact.create({
            UserId: req.userId,
            Name: req.body.Name,
            Address: req.body.Address,
            Cellphone: req.body.Cellphone,
            ProfilePic: result.secure_url,
        });
        res.status(200).json(data.dataValues);
    } catch (err) {
        if (err instanceof ValidationError) {
            let messages = '';
            err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
            res.status(400).json({ message: messages });
        } else {
            throw err;
        }
    }
});

// PUT /api/contacts/{contactId}: Update a contact for the logged user
router.put("/api/contacts/:id", verifyToken, async (req, res) => {
    try {
        let item = await db.Contact.findOne({
            where: { IdContact: req.params.id, UserId: req.userId },
        });

        if (!item) {
            res.status(404).json({ message: "Contact not found" });
            return;
        }

        item.Name = req.body.Name;
        item.Address = req.body.Address;
        item.Cellphone = req.body.Cellphone;
        item.ProfilePic = req.body.ProfilePic;

        await item.save();
        res.sendStatus(200);
    } catch (err) {
        if (err instanceof ValidationError) {
            let messages = '';
            err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
            res.status(400).json({ message: messages });
        } else {
            throw err;
        }
    }
});

module.exports = router;