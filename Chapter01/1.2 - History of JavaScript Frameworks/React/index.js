import React, { Component } from 'react'
import { render } from 'react-dom'

class Timer extends Component {

    constructor(props){
        super(props)
        this.state = {
            seconds: 0
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const { seconds } = this.state 
            this.setState({
                seconds: seconds + 1
            })
        },1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render(){
        const { seconds } = this.state 
        return (
            <div>
                Seconds Elapsed: {seconds}
            </div>
        )
    }
}

const mountNode = document.getElementById('app')

render(<Timer></Timer>, mountNode)
