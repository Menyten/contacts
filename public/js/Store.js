class Store {

  static addContact(contact) {
    let contacts = Store.getContacts();
    contacts = [...contacts, contact];
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  static getContacts() {
    let contacts;
    if (localStorage.getItem('contacts') === null) {
      contacts = [];
    } else {
      contacts = JSON.parse(localStorage.getItem('contacts'));
    }
    return contacts;
  }

  static updateContact(updatedContact) {
    console.log('updated', updatedContact);
    const contacts = Store.getContacts();
    let filteredContacts = contacts.filter(contact => contact.name !== updatedContact.name);
    const contact = contacts.find(contact => contact.name === updatedContact.name);
    
    updatedContact.history = [...contact.history, updatedContact.history];
    
    filteredContacts = [...filteredContacts, updatedContact];
    localStorage.setItem('contacts', JSON.stringify(filteredContacts));
  }

  static removeContact(name) {
    const contacts = Store.getContacts();
    const filteredContacts = contacts.filter(contact => contact.name !== name);
    localStorage.setItem('contacts', JSON.stringify(filteredContacts));
  }

}

export default Store;