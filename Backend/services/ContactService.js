const { ValidationError } = require("sequelize");
const { Contact } = require("../models")
const { User } = require('../models/user');


class ContactService {
    static async getAllContacts(userId) {
        return await Contact.findAll({
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
        const contact = await Contact.findOne({
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
        return await Contact.create({
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
        let item = await Contact.findOne({
            where: { IdContact: contactId, UserId: userId },
        });

        if (!item) {
            throw new Error('Contact not found');
        }

        item.Name = contactData.Name;
        item.Email = contactData.Email;
        item.Title = contactData.Title;
        item.Address = contactData.Address;
        item.Cellphone = contactData.Cellphone;
        item.ProfilePic = contactData.ProfilePic;

        await item.save();
        return item;
    }

    static async deleteContact(userId, contactId) {
        const result = await Contact.destroy({
            where: { IdContact: contactId, UserId: userId },
        });

        if (result === 0) {
            throw new Error('Contact not found');
        }

        return result;
    }
}

module.exports = ContactService;
