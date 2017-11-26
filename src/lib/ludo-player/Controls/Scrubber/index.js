// @flow

/** @jsx h */

import {bem} from 'bem'
import {Component, h} from 'preact'
import style from './index.css'

function numberPadZero (num) {
  return num < 10 ? `0${num}` : num
}

function renderTime (seconds) {
  if (!seconds) return '00:00:00'

  const mins = Math.floor(seconds / 60)
  const hours = Math.floor(mins / 60)

  return `${numberPadZero(hours)}:${numberPadZero(mins)}:${numberPadZero(Math.round(seconds % 60))}`
}

class Scrubber extends Component<any, any> {
  barElm: HTMLDivElement
  handleMouseDown: Function
  handleMouseMove: Function
  handleMouseUp: Function
  handleResize: Function

  constructor () {
    super()
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.state = {
      clientX: null,
      x: null,
      width: null,
      isDragging: false
    }
  }

  componentDidMount () {
    const rect = this.barElm.getBoundingClientRect()

    this.setState({x: rect.left, width: rect.width})

    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
    window.addEventListener('resize', this.handleResize)
  }

  handleMouseDown (evt: MouseEvent) {
    evt.preventDefault()
    this.setState({isDragging: true})
    this.setState({clientX: evt.clientX})
  }

  handleMouseMove (evt: MouseEvent) {
    if (this.state.isDragging) {
      evt.preventDefault()
      this.setState({clientX: evt.clientX})
    }
  }

  handleMouseUp (evt: MouseEvent) {
    evt.preventDefault()
    if (this.state.isDragging) {
      this.props.onScrub((this.state.clientX - this.state.x) / this.state.width)
      this.setState({isDragging: false})
    }
  }

  handleResize () {
    const barRect = this.barElm.getBoundingClientRect()

    this.setState({x: barRect.left, width: barRect.width})
  }

  render () {
    const timeWidth = this.props.time / this.props.duration * 100

    return (
      <div class={style.scrubber}>
        <span class={bem(style.scrubber__time, 'left')}>{renderTime(this.props.time)}</span>
        <span class={bem(style.scrubber__time, 'right')}>{renderTime(this.props.duration - this.props.time)}</span>
        <div ref={barElm => (this.barElm = barElm)} class={style.scrubber__bar} onMouseDown={this.handleMouseDown}>
          <div class={style.scrubber__bgBar} />
          <div class={style.scrubber__bufferBar} />
          <div class={style.scrubber__timeBar} style={{width: `${timeWidth}%`}} />
          <div class={style.scrubber__playhead} style={{left: `${timeWidth}%`}} />
        </div>
      </div>
    )
  }
}

export default Scrubber
