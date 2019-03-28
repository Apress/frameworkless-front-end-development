const extractUrlParams = (route, windowHash) => {
  if (route.params.length === 0) {
    return {}
  }

  const params = {}

  const matches = windowHash
    .match(new RegExp(`^${route.hash.replace(/\//g, '\\/')}$`))

  matches.shift()

  matches.forEach((paramValue, index) => {
    const paramName = route.params[index]
    params[paramName] = paramValue
  })

  return params
}

export default () => {
  const routes = []
  let notFound = () => {}

  const router = {}

  const ROUTE_PARAMETER_REGEXP = /:(\w+)/g
  const URL_FRAGMENT_REGEXP = '([^\\/]+)'

  const checkRoutes = () => {
    const currentRoute = routes.find(route => {
      if (route.params.length === 0) {
        return route.hash === window.location.hash
      }

      const regExp = new RegExp(`^${route.hash.replace(/\//g, '\\/')}$`)

      return regExp.test(window.location.hash)
    })

    if (!currentRoute) {
      notFound()
      return
    }

    const urlParams = extractUrlParams(currentRoute, window.location.hash)

    currentRoute.callback(urlParams)
  }

  router.addRoute = (hash, callback) => {
    const params = []

    const parsedHash = hash
      .replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
        params.push(paramName)
        return URL_FRAGMENT_REGEXP
      })

    routes.push({
      hash: parsedHash,
      callback,
      params
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
