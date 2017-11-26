// @flow

/** @jsx h */

import {Component, h} from 'preact'
import style from './index.css'

import Controls from './Controls'
import Video from './Video'

class VideoPlayer extends Component<any> {
  elm: any
  handleDblClick: Function
  video: Video

  constructor () {
    super()
    this.handleDblClick = this.handleDblClick.bind(this)
  }

  componentDidMount () {
    this.video.subscribe({next: this.setState.bind(this)})
  }

  handleDblClick () {
    if (this.elm.webkitRequestFullscreen) {
      this.elm.webkitRequestFullscreen()
    } else if (this.elm.requestFullscreen) {
      this.elm.requestFullscreen()
    }
  }

  render () {
    return (
      <div ref={elm => (this.elm = elm)} class={style.videoPlayer} onDblClick={this.handleDblClick}>
        <Video {...this.props} onClick={() => this.video.controls.togglePlay()} ref={video => (this.video = video)} />
        <Controls
          onPlay={() => this.video.controls.play()}
          onPause={() => this.video.controls.pause()}
          onScrub={position => this.video.controls.setPosition(position)}
          {...this.state}
        />
      </div>
    )
  }
}

export default VideoPlayer
