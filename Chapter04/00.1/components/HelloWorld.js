const DEFAULT_COLOR = 'black'

export default class HelloWorld extends HTMLElement {
  get color () {
    return this.getAttribute('color') || DEFAULT_COLOR
  }

  set color (value) {
    this.setAttribute('color', value)
  }

  connectedCallback () {
    window.requestAnimationFrame(() => {
      const div = document.createElement('div')
      div.textContent = 'Hello World!'

      div.style.color = this.color

      this.appendChild(div)
    })
  }
}
