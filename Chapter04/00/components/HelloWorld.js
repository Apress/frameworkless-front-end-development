export default class HelloWorld extends HTMLElement {
  connectedCallback () {
    window.requestAnimationFrame(() => {
      this.innerHTML = '<div>Hello World!</div>'
    })
  }
}
