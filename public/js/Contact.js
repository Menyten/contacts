class Contact {
  constructor(name, phoneNumbers = [], emails = []) {
    this.name = name;
    this.phoneNumbers = phoneNumbers;
    this.emails = emails;
    this.history = [];
  }
}

export default Contact;