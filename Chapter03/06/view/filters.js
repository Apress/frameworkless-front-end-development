const FILTERS = [
  'All',
  'Active',
  'Completed'
]

const createOnClickHandler = (changeFilter,text) => e => {
  e.preventDefault()
  changeFilter(text)
}

export default (targetElement, { currentFilter }, events) => {
  const newFilters = targetElement.cloneNode(true)
  newFilters.innerHTML = ''

  FILTERS
  .map(filter => {
    const li = document.createElement('li')
    const a = document.createElement('a')
    
    a.textContent = filter

    if (a.textContent === currentFilter) {
      a.classList.add('selected')
    }

    a.addEventListener('click', createOnClickHandler(events.changeFilter, a.textContent))

    li.appendChild(a)

    return li
  })
  .forEach(li => {
    newFilters.appendChild(li)
  })

  return newFilters
}
