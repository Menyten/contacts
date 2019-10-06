import Router from './Router.js';
import UI from './UI.js';

UI.buildHeaderAndMain();

UI.renderContacts();

Router.frontendRouter(location.pathname);

window.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.closest('a')) {
    const link = e.target.closest('a').getAttribute('href');
    history.pushState(null, null, link);
    Router.frontendRouter(link);
  } else if (e.target.classList.contains('btn-save')) {
    UI.addContact();
  } else if (e.target.classList.contains('delete')) {
    UI.removeContact(e);
  }

});