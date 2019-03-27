import createRouter from './router.js'
import createPages from './pages.js'

const container = document.querySelector('main')

const pages = createPages(container)

const router = createRouter()

document
  .querySelectorAll('button[data-navigate]')
  .forEach(b => {
    b.addEventListener('click', (e) => {
      window.location.hash = b.dataset.navigate
    })
  })

router
  .addRoute('#/', pages.home)
  .addRoute('#/list', pages.list)
  .setNotFound(pages.notFound)
  .start()
