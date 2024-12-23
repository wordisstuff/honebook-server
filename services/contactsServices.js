import { Contact } from '../db/models/Contact.js';

export const getAllContactsService = (filter, owner) => {
    const contactQuery = Contact.find({ owner });

    if (filter.type) {
        contactQuery.where('contactType').equals(filter.type);
    }
    return Contact.find().merge(contactQuery).exec();
};

export const getContactByIdService = (contactId, owner) =>
    Contact.findOne({ _id: contactId, owner });

export const addContactService = contactData => Contact.create(contactData);

export const deleteContactService = (contactId, owner) =>
    Contact.findOneAndDelete({ _id: contactId, owner });

export const updateContactService = (contactId, contactData, owner) =>
    Contact.findOneAndUpdate({ _id: contactId, owner }, contactData, {
        new: true,
    });
