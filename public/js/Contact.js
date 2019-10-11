class Contact {
  constructor(name, phoneNumbers = [], emails = [], history = []) {
    this.name = name;
    this.phoneNumbers = phoneNumbers;
    this.emails = emails;
    this.history = history;
  }
}

export default Contact;