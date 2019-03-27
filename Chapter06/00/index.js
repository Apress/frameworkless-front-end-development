import createRouter from './router.js'

const router = createRouter()

const indexPage = () => {
  document
    .querySelector('main')
    .textContent = 'This is Index Page'
}

const listPage = () => {
  document
    .querySelector('main')
    .textContent = 'This is List Page'
}

document
  .querySelectorAll('button[data-navigate]')
  .forEach(b => {
    b.addEventListener('click', (e) => {
      window.location.hash = b.dataset.navigate
    })
  })

router
  .addRoute('#/', indexPage)
  .addRoute('#/list', listPage)
  .start()
