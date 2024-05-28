const { ValidationError } = require("sequelize");
const db = require("../base-orm/sequelize-init");

class ContactService {
    static async getAllContacts(userId) {
        return await db.Contact.findAll({
            where: { UserId: userId },
            attributes: [
                "IdContact",
                "Name",
                "Address",
                "Cellphone",
                "ProfilePic",
                "Title",
                "Email",
            ],
            order: [["Name", "ASC"]],
        });
    }

    static async getContactById(userId, contactId) {
        const contact = await db.Contact.findOne({
            where: { UserId: userId, IdContact: contactId },
            attributes: [
                "IdContact",
                "Name",
                "Address",
                "Cellphone",
                "ProfilePic",
                "Title",
                "Email",
            ],
        });

        if (!contact) {
            throw new Error('Contact not found');
        }

        return contact;
    }

    static async createContact(userId, contactData) {
        return await db.Contact.create({
            UserId: userId,
            Email: contactData.email,
            Name: contactData.name,
            Address: contactData.address,
            Cellphone: contactData.phone,
            ProfilePic: contactData.profilePicture,
            Title: contactData.title,
        });
    }

    static async updateContact(userId, contactId, contactData) {
        let item = await db.Contact.findOne({
            where: { IdContact: contactId, UserId: userId },
        });

        if (!item) {
            throw new Error('Contact not found');
        }

        item.Name = contactData.name;
        item.Email = contactData.email;
        item.Title = contactData.title;
        item.Address = contactData.address;
        item.Cellphone = contactData.phone;
        item.ProfilePic = contactData.profilePicture;

        await item.save();
        return item;
    }

    static async deleteContact(userId, contactId) {
        const result = await db.Contact.destroy({
            where: { IdContact: contactId, UserId: userId },
        });

        if (result === 0) {
            throw new Error('Contact not found');
        }

        return result;
    }
}

module.exports = ContactService;