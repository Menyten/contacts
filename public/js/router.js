import Store from "./Store.js";

class Router {

  static frontendRouter(path) {
    let routes = {
      '/': () => Router.showCurrentRoute('contacts'),
      '/add': () => Router.showCurrentRoute('add'),
    };
    Store.getContacts().forEach(({ name }) => {
      routes = { ...routes, [`/${name}`]: () => Router.showCurrentRoute('selected-contact') }
    });
    console.log(routes);

    // no path found then change path to '/404';
    path = routes[path] ? path : '/404';
    // run the function associated with the path
    routes[path]();
  }

  static showCurrentRoute(routeClass) {
    const pages = document.querySelectorAll('body main .container > *');
    pages.forEach(page => page.classList.contains(routeClass) ? page.classList.remove('hide') : page.classList.add('hide'));
  }

}



export default Router;
