class Router {

  static frontendRouter(path) {
    const routes = {
      '/': () => Router.showCurrentRoute('contacts'),
      '/add': () => Router.showCurrentRoute('add'),
    };
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
