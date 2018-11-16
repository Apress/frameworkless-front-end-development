const createElement = () => ({
  text: 'Hello Frameworkless',
  completed: Math.floor((Math.random() * 2) + 1) > 1
})

const repeat = (factory, number) => {
  const array = []
  for (let index = 0; index < number; index++) {
    array.push(factory(index))
  }
  return array
}

export default () => {
  const howMany = Math.floor((Math.random() * 10) + 1)
  return repeat(createElement, howMany)
}
