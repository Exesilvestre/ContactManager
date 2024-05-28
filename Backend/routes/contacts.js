const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/VerifyToken');
const ContactsController = require('../controllers/ContactsController');

// GET
router.get("/api/contacts", verifyToken, ContactsController.getAllContacts);
router.get("/api/contacts/:id", verifyToken, ContactsController.getContactById);

// POST
router.post("/api/contacts", verifyToken, ContactsController.createContact);

// PUT
router.put("/api/contacts/:id", verifyToken, ContactsController.updateContact);

// DELETE
router.delete("/api/contacts/:id", verifyToken, ContactsController.deleteContact);

module.exports = router;
