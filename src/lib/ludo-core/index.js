// @flow

/** @jsx h */

import {h} from 'preact'

// Choose a state management strategy:
// import {mount} from './opstore'
// import {mount} from './redux'
// import {mount} from './rxjs'
import {mount} from './vanilla'
// import {mount} from './vanilla-observable'

import type {Props} from './types'

function render (props: Props) {
  return (
    <video poster={props.poster} autoPlay={props.autoPlay} muted={props.muted} ref={props.ref}>
      <source type='video/mp4' src={props.sources.mp4} />
      <source type='video/webm' src={props.sources.webm} />
    </video>
  )
}

export {mount, render}
