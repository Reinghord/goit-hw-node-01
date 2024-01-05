const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await listContacts();
      return console.table(list);

    case "get":
      const get = await getContactById(id);
      return console.log(get);

    case "add":
      const add = await addContact(name, email, phone);
      return console.log(add);

    case "remove":
      const remove = await removeContact(id);
      return console.log(remove);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
