const crypto = require("crypto");
const fs = require("fs/promises");

const getAll = require("./getAll");
const updateContacts = require("./updateContacts");

const id = crypto.randomBytes(16).toString("hex");

const addContact = async (data) => {
  const contacts = await getAll();
  const newContact = { ...data, id };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

module.exports = addContact;
