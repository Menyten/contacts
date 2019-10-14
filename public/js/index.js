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
    if (e.target.classList.contains('select-contact')) {
      UI.renderSelectedContact(link.substr(1));
    }
  } else if (e.target.classList.contains('btn-field')) {
    UI.insertNewField();
  } else if (e.target.classList.contains('btn-save')) {
    UI.addContact();
  } else if (e.target.classList.contains('delete')) {
    UI.removeContact(e);
  } else if (e.target.classList.contains('btn-edit')) {
    UI.toggleEditContact();
  } else if (e.target.classList.contains('btn-save-edit')) {
    UI.saveUpdatedContact();
  } else if (e.target.classList.contains('delete-detail')) {
    UI.removeDetail(e)
  } else if (e.target.classList.contains('new-detail-button')) {
    UI.addNewDetailToContact();
  }
});

window.addEventListener("popstate", () => {
  Router.frontendRouter(location.pathname);
});