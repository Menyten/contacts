import buildHeaderAndMain from './layout.js';
import frontendRouter from './router.js';

buildHeaderAndMain();

frontendRouter(location.pathname);

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

window.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.closest('a')) {
    const link = e.target.closest('a').getAttribute('href');
    history.pushState(null, null, link);
    frontendRouter(link);
  }
});