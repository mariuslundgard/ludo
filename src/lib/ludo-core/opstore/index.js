// @flow

import {getBufferRanges} from '../utils'
import {createStore} from './store'

import type {IStore} from 'opstore'
import type {BrowserContext, Props, State} from '../types'

export function mount (elm: any, props: Props): BrowserContext {
  // Create store with initial state
  const store: IStore<State> = createStore({
    playing: false,
    time: elm.currentTime || 0,
    duration: elm.duration || 0,
    bufferRanges: getBufferRanges(elm)
  })

  // Create a store reference on which to perform operations
  const ref = store.ref()

  // Create controls that can be used in views
  const controls = {
    play: () => elm.play(),
    pause: () => elm.pause(),
    togglePlay: () => (ref.get('playing') ? elm.pause() : elm.play()),
    setPosition: position => (elm.currentTime = elm.duration * position)
  }

  // Create event handler functions
  const handlePlay = () => ref.set('playing', true)
  const handlePause = () => ref.set('playing', false)
  const handleTimeupdate = () => ref.set('time', elm.currentTime)
  const handleDurationchange = () => ref.set('duration', elm.duration)
  const handleProgress = () => ref.set('bufferRanges', getBufferRanges(elm))

  function unmount () {
    // Unlisten to events
    elm.removeEventListener('play', handlePlay)
    elm.removeEventListener('pause', handlePause)
    elm.removeEventListener('timeupdate', handleTimeupdate)
    elm.removeEventListener('durationchange', handleDurationchange)
    elm.removeEventListener('progress', handleProgress)
    if (props.onClick) {
      elm.removeEventListener('click', props.onClick)
    }
  }

  // Listen to events
  elm.addEventListener('play', handlePlay)
  elm.addEventListener('pause', handlePause)
  elm.addEventListener('timeupdate', handleTimeupdate)
  elm.addEventListener('durationchange', handleDurationchange)
  elm.addEventListener('progress', handleProgress)
  if (props.onClick) {
    elm.addEventListener('click', props.onClick)
  }

  return {
    controls,
    subscribe: store.subscribe,
    unmount
  }
}
