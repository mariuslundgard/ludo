// @flow

/** @jsx h */

import {Component, h} from 'preact'
import style from './index.css'

// Components
import Scrubber from './Scrubber'

// Icons
import PauseIcon from 'icons/Pause'
import PlayIcon from 'icons/Play'

class Controls extends Component<any> {
  render () {
    return (
      <div class={style.controls}>
        <div class={style.controls__togglePlayWrapper}>
          {this.props.playing && (
            <button class={style.controls__playBtn} onClick={this.props.onPause}>
              <PauseIcon />
            </button>
          )}
          {!this.props.playing && (
            <button class={style.controls__pauseBtn} onClick={this.props.onPlay}>
              <PlayIcon />
            </button>
          )}
        </div>
        <div class={style.controls__scrubberWrapper}>
          <Scrubber {...this.props} onScrub={this.props.onScrub} />
        </div>
      </div>
    )
  }
}

export default Controls
