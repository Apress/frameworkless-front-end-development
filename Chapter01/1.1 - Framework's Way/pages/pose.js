import React, { Component } from 'react'
import posed from 'react-pose'

const Box = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  transition: {
    ease: 'linear',
    duration: 500
  }
})

class PoseExample extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: true
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
    const pose = isVisible ? 'visible' : 'hidden'
    return (
      <div>
        <Box className='box' pose={pose} />
        <button onClick={this.toggle}>Toggle</button>
      </div>
    )
  }
}

export default PoseExample
