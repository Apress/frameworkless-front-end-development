const ELEMENT = {
  text: 'Hello Frameworkless'
}

const repeat = (element, number) => {
  const array = []
  for (let index = 0; index < number; index++) {
    array.push(element)
  }
  return array
}

export default () => {
  const howMany = Math.floor((Math.random() * 10) + 1)
  return repeat(ELEMENT, howMany)
}
