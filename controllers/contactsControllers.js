import {
    getAllContactsService,
    addContactService,
    deleteContactService,
    updateContactService,
    getContactByIdService,
} from '../services/contactsServices.js';
import { isValidObjectId } from 'mongoose';
import parseFilters from '../utils/parseFilters.js';

export const getAllContacts = async (req, res, next) => {
    const { _id } = req.user;
    const filter = parseFilters(req.query);
    const contacts = await getAllContactsService(filter, _id);
    res.json(contacts);
};

export const getContactById = async (req, res, next) => {
    const { _id } = req.user;
    const { contactId } = req.params;
    const contact = await getContactByIdService(contactId, _id);
    if (!contact) {
        res.status(404).json({
            message: `Contact with id${contactId} not found!`,
        });
        return;
    }
    res.json(contact);
};

export const addContact = async (req, res, next) => {
    const contact = await addContactService({
        ...req.body,
        owner: req.user._id,
    });
    res.status(201).json(contact);
};

export const deleteContact = async (req, res, next) => {
    const { _id } = req.user;
    const { contactId } = req.params;
    console.log(req.params);
    const contact = await deleteContactService(contactId, _id);
    if (!contact) {
        res.status(404).json({
            message: `Contact with id${contactId} not found!`,
        });
        return;
    }
    res.json({
        message: `Contact with id ${contactId} was deleted!`,
    });
};
export const updateContact = async (req, res, next) => {
    const { _id } = req.user;
    const { contactId } = req.params;
    const contact = await updateContactService(contactId, req.body, _id);
    console.log(contact);
    if (!contact) {
        res.status(404).json({
            message: `Contact with id${contactId} not found!`,
        });
        return;
    }
    res.status(200).json({
        message: `Contact with id ${contactId} was updated!`,
        data: contact,
    });
};
