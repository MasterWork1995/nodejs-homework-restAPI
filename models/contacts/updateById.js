const getAll = require("./getAll");
const updateContacts = require("./updateContacts");
const onCorrectId = require("./onCorrectId");

const updateById = async (id, name, email, phone) => {
  const contacts = await getAll();
  const index = contacts.findIndex((item) => item.id.toString() === id);
  if (index === -1) {
    return onCorrectId();
  }
  contacts[index] = { id, name, email, phone };
  await updateContacts(contacts);
  return contacts[index];
};

module.exports = updateById;
