export default () => {
  const routes = []
  const router = {}

  const checkRoutes = () => {
    const currentRoute = routes.find(route => {
      return route.hash === window.location.hash
    })

    if (!currentRoute) {
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

  return router
}
