// The router (do whatever you want here)
const frontendRouter = path => {
  const routes = {
    '/': () => showCurrentRoute('contacts'),
    '/add': () => showCurrentRoute('add'),
  };
  // no path found then change path to '/404';
  path = routes[path] ? path : '/404';
  // run the function associated with the path
  routes[path]();
}

const showCurrentRoute = routeClass => {
  const pages = document.querySelectorAll('body main .container > *');
  pages.forEach(page => page.classList.contains(routeClass) ? page.classList.remove('hide') : page.classList.add('hide'));
}



export default frontendRouter;
