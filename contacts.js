const fs = require("fs").promises;
const path = require("path");
//Extra module for ID generation
const { nanoid } = require("nanoid");

//Absolute path to contacts.json
const contactsPath = path.resolve("./db/contacts.json");

// 1. Reads file contacts.json
// 2. Passes to console string containing contacts.json
// 3. If error, shows error message in console
function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsed = JSON.parse(data);
      console.table(parsed);
    })
    .catch((err) => console.log(err.message));
}

// 1. Reads file contacts.json
// 2. Parses JSON from the file to receive array
// 3. Finds contactID in array and displays it in console
// 4. If error, shows error message in console
function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsed = JSON.parse(data);
      const contact = parsed.find((contact) => contact.id === contactId);
      console.log(contact);
    })
    .catch((err) => console.log(err.message));
}

// 1. Reads file contacts.json
// 2. Parses JSON from the file to receive array
// 3. Filters array to delete contactId
// 4. Writes back to file new stringified array
// 5. If error, shows error message in console
function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsed = JSON.parse(data);
      console.log(parsed.find((contact) => contact.id === contactId));
      return parsed.filter((contact) => contact.id !== contactId);
    })
    .then((result) => fs.writeFile(contactsPath, JSON.stringify(result)))
    .catch((err) => console.log(err.message));
}

// 1. Creates contacts with help of nanoid
// 2. Reads file contacts.json
// 3. Parses JSON from the file to receive array
// 4. Creates new array with new contacts using concat method
// 5. Writes back to file new stringified array
// 6. If error, shows error message in console
function addContact(name, email, phone) {
  const contact = [{ id: nanoid(), name, email, phone }];
  console.log(contact);
  fs.readFile(contactsPath)
    .then((data) => {
      const parsed = JSON.parse(data);
      return parsed.concat(contact);
    })
    .then((result) => fs.writeFile(contactsPath, JSON.stringify(result)))
    .catch((err) => console.log(err.message));
}

//Export of functions to use anywhere
module.exports = { listContacts, getContactById, removeContact, addContact };
