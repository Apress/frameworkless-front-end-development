import createRouter from './router.js'
import createPages from './pages.js'

const container = document.querySelector('main')

const pages = createPages(container)

const router = createRouter()

router
  .addRoute('#/', pages.home)
  .addRoute('#/list', pages.list)
  .setNotFound(pages.notFound)
  .start()

document
  .querySelectorAll('button[data-navigate]')
  .forEach(b => {
    b.addEventListener('click', (e) => {
      router.navigate(b.dataset.navigate)
    })
  })
