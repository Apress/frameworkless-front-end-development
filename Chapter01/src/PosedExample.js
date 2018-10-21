import React from 'react'
import posed from 'react-pose'

const Box = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
})

export default class PosedExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  render () {
    const { isVisible } = this.state
    return (
      <div>
        <Box className='box' pose={isVisible ? 'visible' : 'hidden'} />
        <button onClick={this.toggle}>Toggle</button>
      </div>
    )
  }
}
