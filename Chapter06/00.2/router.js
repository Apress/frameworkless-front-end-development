export default () => {
  const routes = []
  let notFound = () => {}

  const router = {}

  const ROUTE_PARAMETER_REGEXP = /:(\w+)/g
  const URL_FRAGMENT_REGEXP = /([^\\/]+)/g

  const checkRoutes = () => {
    const currentRoute = routes.find(route => {
      return route.hash === window.location.hash
    })

    if (!currentRoute) {
      notFound()
      return
    }

    currentRoute.callback()
  }

  router.addRoute = (hash, callback) => {
    routes.push({
      hash,
      callback
    })

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

  router.setNotFound = cb => {
    notFound = cb
    return router
  }

  router.navigate = hash => {
    window.location.hash = hash
  }

  return router
}
