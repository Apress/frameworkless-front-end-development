export default () => {
  const routes = []
  let notFound = () => {}

  const router = {}

  const checkRoutes = () => {
    const currentRoute = routes.find(route => {
      return route.fragment === window.location.hash
    })

    if (!currentRoute) {
      notFound()
      return
    }

    currentRoute.callback()
  }

  router.addRoute = (fragment, callback) => {
    routes.push({
      fragment,
      callback
    })

    return router
  }

  router.setNotFound = cb => {
    notFound = cb
    return router
  }

  router.start = () => {
    window.addEventListener('hashchange', checkRoutes)
    if (!window.location.hash) {
      window.location.hash = '#/'
    }

    checkRoutes()

    return router
  }

  return router
}
