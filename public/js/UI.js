import Store from './Store.js';
import Contact from './Contact.js';

class UI {

  static buildContact({ name, phone }) {
    const contact = /*html*/`
    <article class="contact" id="${phone}">
      <p>${name}</p>
      <div>
        <a href="/${name}">
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
          <button class="btn-save">Spara</button>
        </form>
      </section>
      <section class="selected-contact"></section>
    </div>
  `;
  }

  static buildSelectedContact() {
    const data = {
      name: 'Joel',
      phoneNumbers: ['0707644525', '0704824666'],
      emails: ['joel.pedersen97@gmail.com', 'mack-14@hotmail.com']
    }

    const contact = /*html*/`
      <div class="selected-container">
        <h1 class="selected-name">${data.name}</h1>
      </div>`;
    document.querySelector('.selected-contact').innerHTML = contact;

    const renderContactInfo = (arrayOfInfo, title, cssClass) => {
      arrayOfInfo.forEach(info => {
        const element = document.createElement('p');
        element.classList.add(`${cssClass}`);
        element.innerHTML = `${title}: <span>${info}</span>`
        document.querySelector('.selected-name').insertAdjacentElement('afterend', element);
      });
    }

    if (data.emails.length) {
      renderContactInfo(data.emails, 'Email', 'selected-email');
    }
    if (data.phoneNumbers.length) {
      renderContactInfo(data.phoneNumbers, 'Telefon', 'selected-phone');
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
    if (!name || !phone || !email) {
      alert('All fields must be filled!');
    } else {
      Store.addContact(new Contact(name, phone, email));
      UI.buildContact(new Contact(name, phone, email));
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