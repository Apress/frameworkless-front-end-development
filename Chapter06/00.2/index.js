import createRouter from './router.js'
import createPages from './pages.js'

const container = document.querySelector('main')

const pages = createPages(container)

const router = createRouter()

router
  .addRoute('#/', pages.home)
  .addRoute('#/list', pages.list)
  .addRoute('#/list/:id', pages.detail)
  .addRoute('#/list/:id/:anotherId', pages.anotherDetail)
  .setNotFound(pages.notFound)
  .start()

const NAV_BTN_SELECTOR = 'button[data-navigate]'

document
  .body
  .addEventListener('click', e => {
    const { target } = e
    if (target.matches(NAV_BTN_SELECTOR)) {
      const { navigate } = target.dataset
      router.navigate(navigate)
    }
  })
