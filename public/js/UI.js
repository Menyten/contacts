import Store from './Store.js';
import Contact from './Contact.js';

class UI {

  static buildContact({ name }) {
    const contact = /*html*/`
    <article class="contact" id="${name}">
      <p>${name}</p>
      <div>
        <a class="select-contact" href="/${name}">
          Gå till kontakt
        </a>
        <button class="delete">
          Ta bort
        </button>
      </div>
    </article>
    `;
    document.querySelector('.contacts').innerHTML += contact;
  }

  static buildHeaderAndMain() {
    const headerElement = document.createElement('header');
    const mainElement = document.createElement('main');
    document.body.append(headerElement);
    document.body.append(mainElement);

    headerElement.innerHTML += /*html*/`
    <a href="/">
      <h2>Kontakter</h2>
    </a>
    <a href="/add">Ny kontakt</a>
  `;

    mainElement.innerHTML += /*html*/`
    <div class="container">
      <section class="contacts"></section>
      <section class="add">
      <h1>Ny kontakt</h1>
        <form id="add">
          <div class="input-group">
            <label>Namn</label>
            <input type="text" class="name"/>
          </div>
          <div class="input-group">
            <label>Mobil</label>
            <input type="number" class="phone"/>
          </div>
          <div class="input-group">
            <label>E-post</label>
            <input type="email" class="email"/>
          </div>
          <button type="button" class="btn-field">Lägg till nytt fält</button>
          <button class="btn-save">Spara</button>
        </form>
      </section>
      <section class="selected-contact"></section>
    </div>
  `;
  }

  static insertNewField() {
    const group = document.createElement('div');
    group.classList.add('input-group');

    const fields = /* html */`
      <select id="select">
        <option value="phone">Mobil</option>
        <option value="email">E-post</option>
      </select>
      <input type="text" class="new-input"/>
    `;
    group.innerHTML = fields;
    const form = document.querySelector('#add');
    form.insertBefore(group, form.childNodes[7]);
  }

  static renderSelectedContact(contactName) {
    const contacts = Store.getContacts()
    const contact = contacts.find(({ name }) => name === contactName);
    console.log(contact);
    
    const contactHtml = /*html*/`
      <div class="selected-container">
        <h1 class="selected-name">${contact.name}</h1>
      </div>`;
    document.querySelector('.selected-contact').innerHTML = contactHtml;

    const renderContactInfo = (arrayOfInfo, title, cssClass) => {
      arrayOfInfo.forEach(info => {
        const element = document.createElement('p');
        element.classList.add(`${cssClass}`);
        element.innerHTML = `${title}: <span>${info}</span>`
        document.querySelector('.selected-name').insertAdjacentElement('afterend', element);
      });
    }

    if (contact.emails.length) {
      renderContactInfo(contact.emails, 'Email', 'selected-email');
    }
    if (contact.phoneNumbers.length) {
      renderContactInfo(contact.phoneNumbers, 'Telefon', 'selected-phone');
    }
  }

  static renderContacts() {
    const contacts = Store.getContacts();
    contacts.forEach(contact => UI.buildContact(contact));
  }

  static clearFields() {
    document.querySelector('.name').value = '';
    document.querySelector('.phone').value = '';
    document.querySelector('.email').value = '';
  }

  static addContact() {
    const name = document.querySelector('.name').value;
    const phone = document.querySelector('.phone').value;
    const email = document.querySelector('.email').value;
    const newFields = document.querySelectorAll('.new-input');
    let phoneNumbers = [phone];
    let emails = [email];
    newFields.forEach(field => {
      isNaN(field.value) ?
        emails = [...emails, field.value] :
        phoneNumbers = [...phoneNumbers, field.value];
    });
    if (!name) {
      return alert('Name must not be empty!');
    } else {
      Store.addContact(new Contact(name, phoneNumbers, emails));
      UI.buildContact(new Contact(name, phoneNumbers, emails));
      UI.clearFields();
    }
  }

  static removeContact(e) {
    const parent = e.target.parentNode.parentNode;
    Store.removeContact(parent.id);
    parent.remove()
  };

}





export default UI;