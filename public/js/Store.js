class Store {

  static getContacts() {
    let contacts;
    if (localStorage.getItem('contacts') === null) {
      contacts = [];
    } else {
      contacts = JSON.parse(localStorage.getItem('contacts'));
    }
    return contacts;
  }

  static addContact(contact) {
    let contacts = Store.getContacts();
    contacts = [...contacts, contact];
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  static removeContact(name) {
    const contacts = Store.getContacts();
    const filteredContacts = contacts.filter(contact => contact.name !== name);
    localStorage.setItem('contacts', JSON.stringify(filteredContacts));
  }

}

export default Store;