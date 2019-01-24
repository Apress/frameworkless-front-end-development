const DEFAULT_COLOR = 'black'

export default class HelloWorld extends HTMLElement {
  static get observedAttributes () {
    return ['color']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (!this.div) {
      return
    }

    if (name === 'color') {
      this.div.style.color = newValue
    }
  }

  get color () {
    return this.getAttribute('color') || DEFAULT_COLOR
  }

  set color (value) {
    this.setAttribute('color', value)
  }

  connectedCallback () {
    window.requestAnimationFrame(() => {
      this.div = document.createElement('div')
      this.div.textContent = 'Hello World!'
      this.div.style.color = this.color
      this.appendChild(this.div)
    })
  }
}
