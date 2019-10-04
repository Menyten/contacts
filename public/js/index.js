import buildHeaderAndMain from './layout.js';
buildHeaderAndMain();
let contacts = [];

const buildContact = name => {
  const contact = `
  <article class="contact">
    <p>${name}</p>
    <div>
      <a href="/${name}">
        Gå till kontakt
      </a>
      <button>
        Ta bort
      </button>
    </div>
  </article>
  `;
  contacts = [...contacts, contact];
}

buildContact('Joel');
buildContact('Samantha');

contacts.map(contact =>
  document.querySelector('.contacts').innerHTML += contact
);