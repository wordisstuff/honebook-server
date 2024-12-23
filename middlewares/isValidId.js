import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    res.status(400).json({ message: "Id is not valid " });
    return;
  }
  next();
};
