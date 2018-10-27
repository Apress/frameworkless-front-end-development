import React, { Component } from 'react'

const animationTiming = {
  duration: 500,
  ease: 'linear',
  fill: 'forwards'
}

const showKeyframes = [
  { opacity: 0 },
  { opacity: 1 }
]

const hideKeyframes = [
  ...showKeyframes
].reverse()
class PosedExample extends Component {
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

  componentDidUpdate (prevProps, prevState) {
    const { isVisible } = this.state
    if (prevState.isVisible !== isVisible) {
      const animation = isVisible ? showKeyframes : hideKeyframes
      this.div.animate(animation, animationTiming)
    }
  }
  render () {
    return (
      <div>
        <div ref={div => { this.div = div }} className='box' />
        <button onClick={this.toggle}>Toggle</button>
      </div>
    )
  }
}

export default PosedExample
