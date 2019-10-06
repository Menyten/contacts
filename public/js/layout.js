const buildHeaderAndMain = () => {
  const headerElement = document.createElement('header');
  const mainElement = document.createElement('main');
  document.body.append(headerElement);
  document.body.append(mainElement);

  headerElement.innerHTML += /*html*/`
  <a href="/">
    <h2>Kontakter</h2>
  </a>
  
  <div class="header-group">
    <button class="search">Sök</button>
    <a href="/add">Ny kontakt</a>
  </div
`;

  mainElement.innerHTML += /*html*/`
  <div class="container">
    <section class="contacts"></section>
    <section class="add">
    <h1>Ny kontakt</h1>
      <form id="add">
        <div class="input-group">
          <label>Namn</label>
          <input type="text"/>
        </div>
        <div class="input-group">
          <label>Mobil</label>
          <input type="number"/>
        </div>
        <div class="input-group">
          <label>E-post</label>
          <input type="email"/>
        </div>
        <button>Spara</button>
      </form>
    </section>
    <section class="contact-namn-här"></section>
  </div>
`;
}

export default buildHeaderAndMain;