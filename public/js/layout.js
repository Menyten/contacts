const buildHeaderAndMain = () => {
  const headerElement = document.createElement('header');
  const mainElement = document.createElement('main');
  document.body.append(headerElement);
  document.body.append(mainElement);

  headerElement.innerHTML += `
  <h2>Kontakter</h2>
  <div class="header-group">
    <button>Sök</button>
    <a href="/add-contact">Ny kontakt</a>
  </div
`;

  mainElement.innerHTML += `
  <div class="container">
    <section class="contacts"></section>
    <section class="add-contact"></section>
    <section class="contact-namn-här"></section>
  </div>
`;
}

export default buildHeaderAndMain;