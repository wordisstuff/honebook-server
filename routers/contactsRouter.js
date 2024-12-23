import { Router } from "express";
import {
  getAllContacts,
  addContact,
  deleteContact,
  updateContact,
  getContactById,
} from "../controllers/contactsControllers.js";

import { isValidId } from "../middlewares/isValidId.js";
import { ctrlWraper } from "../utils/ctrlWraper.js";
import { validateBody } from "../utils/validateBody.js";
import { updateContactSchema } from "../schemas/contacts/updateContactsSchema.js";
import { createContactSchema } from "../schemas/contacts/createContactsSchema.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWraper(getAllContacts));
contactsRouter.get("/:contactId", isValidId, ctrlWraper(getContactById));
contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  ctrlWraper(addContact)
);
contactsRouter.delete("/:contactId", isValidId, ctrlWraper(deleteContact));
contactsRouter.patch(
  "/:contactId",
  isValidId,
  validateBody(updateContactSchema),
  ctrlWraper(updateContact)
);

export default contactsRouter;
