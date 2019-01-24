export default class HelloWorld extends HTMLElement {
  connectedCallback () {
    this.innerHTML = '<div>Hello World!</div>'
  }
}
