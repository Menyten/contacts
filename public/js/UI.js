import Store from './Store.js';
import Contact from './Contact.js';

class UI {

  static edit = false;

  static contactBeforeEdit = '';

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
        <div class="selected-phones-container"></div>
        <div class="selected-emails-container"></div>
        <div class="btn-group">
          <button class="btn-edit">Redigera</button>
        </div>
      </div>`;
    document.querySelector('.selected-contact').innerHTML = contactHtml;



    if (contact.emails.length) {
      UI.renderContactInfo(contact.emails, 'Email', 'selected-email');
    }
    if (contact.phoneNumbers.length) {
      UI.renderContactInfo(contact.phoneNumbers, 'Telefon', 'selected-phone');
    }
  }

  static renderContactInfo(details, title, cssClass) {
    console.log('hej');

    if (Array.isArray(details)) {
      details.forEach(info => {
        const element = document.createElement('p');
        element.classList.add(`${cssClass}`);
        element.innerHTML = `${title}: <span class="contact-spans">${info}</span>`;
        const classToUse = isNaN(info) ? '.selected-emails-container' : '.selected-phones-container';
        document.querySelector(classToUse).append(element);
      });
    } else {
      const element = document.createElement('p');
      element.classList.add(`${cssClass}`);
      element.innerHTML = `${title}: <span class="contact-spans">${details}</span><button class="delete-detail">Ta bort</button>`;
      const classToUse = isNaN(details) ? '.selected-emails-container' : '.selected-phones-container';
      document.querySelector(classToUse).append(element);
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

  static addNewDetailToContact() {
    const inputValue = document.querySelector('.edit-input').value;
    const title = isNaN(inputValue) ? 'E-post' : 'Telefon';
    const cssClass = isNaN(inputValue) ? 'selected-email' : 'selected-phone';

    UI.renderContactInfo(inputValue, title, cssClass);
  }

  static toggleEditContact() {
    const fields = document.querySelectorAll('.contact-spans');
    if (!UI.edit) {
      const selectedContainer = document.querySelector('.selected-container');
      const btnGroup = document.querySelector('.btn-group')
      const newFieldContainer = document.createElement('div');
      const input = document.createElement('input');
      const addButton = document.createElement('button');
      newFieldContainer.className = 'new-detail-container';
      input.setAttribute('type', 'text');
      input.className = 'edit-input';
      addButton.innerHTML = 'Lägg till';
      addButton.className = 'new-detail-button';
      newFieldContainer.append(input);
      newFieldContainer.append(addButton);
      UI.contactBeforeEdit = selectedContainer.outerHTML;
      selectedContainer.insertBefore(newFieldContainer, btnGroup);
      document.querySelector('.btn-edit').innerHTML = 'Avbryt';

      const saveButton = document.createElement('button')
      saveButton.classList.add('btn-save-edit')
      saveButton.innerHTML = 'Spara';
      btnGroup.append(saveButton);

      fields.forEach(field => {
        field.contentEditable = true
        const button = document.createElement('button');
        button.className = 'delete-detail';
        button.innerHTML = 'Ta bort';
        field.parentNode.append(button);
      });
      UI.edit = true;
    } else {
      fields.forEach(field => field.contentEditable = 'inherit');
      document.querySelector('.selected-contact').innerHTML = UI.contactBeforeEdit;
      UI.edit = false;
    }



  }

  static saveUpdatedContact() {
    document.querySelector('.new-detail-container').remove();
    const allDeleteButtons = document.querySelectorAll('.delete-detail');
    allDeleteButtons.forEach(button => button.remove());
    const name = document.querySelector('.selected-name').innerHTML;
    const fields = document.querySelectorAll('.contact-spans');
    const editButton = document.querySelector('.btn-edit');
    const saveButton = document.querySelector('.btn-save-edit');
    let phoneNumbers = [];
    let emails = [];
    fields.forEach(field => isNaN(field.innerHTML) ?
      emails = [...emails, field.innerHTML] :
      phoneNumbers = [...phoneNumbers, field.innerHTML]
    );
    Store.updateContact(new Contact(name, phoneNumbers, emails));
    saveButton.remove();
    editButton.innerHTML = 'Redigera';
    fields.forEach(field => field.contentEditable = 'inherit');
    UI.edit = false;
  }

  static removeDetail(e) {
    e.target.parentNode.remove();
  }

  static removeContact(e) {
    const parent = e.target.parentNode.parentNode;
    Store.removeContact(parent.id);
    parent.remove()
  };

}





export default UI;