const ContactService = require('../services/ContactService');


class ContactsController {
    static async getAllContacts(req, res) {
        try {
            const contacts = await ContactService.getAllContacts(req.userId);
            res.json(contacts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los contactos' });
        }
    }

    static async getContactById(req, res) {
        try {
            const contact = await ContactService.getContactById(req.userId, req.params.id);
            res.json(contact);
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: error.message });
        }
    }

    static async createContact(req, res) {
        try {
            const contact = await ContactService.createContact(req.userId, req.body);
            res.status(200).json(contact);
        } catch (err) {
            if (err instanceof ValidationError) {
                let messages = '';
                err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
                res.status(400).json({ message: messages });
            } else {
                console.error(err);
                res.status(500).json({ message: 'Error al crear el contacto' });
            }
        }
    }

    static async updateContact(req, res) {
        try {
            print(req.body)
            const contact = await ContactService.updateContact(req.userId, req.params.id, req.body);
            res.status(200).json(contact);
        } catch (err) {
            if (err instanceof ValidationError) {
                let messages = '';
                err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
                res.status(400).json({ message: messages });
            } else {
                console.error(err);
                res.status(500).json({ message: 'Error al actualizar el contacto' });
            }
        }
    }

    static async deleteContact(req, res) {
        try {
            await ContactService.deleteContact(req.userId, req.params.id);
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar el contacto' });
        }
    }
}

module.exports = ContactsController;
