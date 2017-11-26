// @flow

/** @jsx h */

import {Component, h} from 'preact'
import style from './index.css'

import VideoPlayer from 'ludo-player'

class Root extends Component<any> {
  videoPlayer: VideoPlayer

  componentDidMount () {
    this.videoPlayer.video.subscribe({
      next: state => console.log('video state:', state)
    })
  }

  render () {
    const currentMedia = this.props.playlist[this.props.playlistIndex]

    return (
      <div class={style.app}>
        {currentMedia && (
          <VideoPlayer {...currentMedia} muted autoPlay ref={videoPlayer => (this.videoPlayer = videoPlayer)} />
        )}
      </div>
    )
  }
}

export default Root
