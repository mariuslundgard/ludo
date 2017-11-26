// @flow

import {getBufferRanges} from '../utils'

import type {BrowserContext, Props, State} from '../types'

export function mount (elm: any, props: Props): BrowserContext {
  const observers = []

  let state: State = {
    playing: false,
    time: elm.currentTime || 0,
    duration: elm.duration || 0,
    bufferRanges: getBufferRanges(elm)
  }

  function update (f) {
    state = f(state)
    observers.forEach(observer => observer.next(state))
  }

  const handlePlay = () => update(state => ({...state, playing: true}))
  const handlePause = () => update(state => ({...state, playing: false}))
  const handleTimeupdate = () => update(state => ({...state, time: elm.currentTime}))
  const handleDurationchange = () => update(state => ({...state, duration: elm.duration}))
  const handleProgress = () => update(state => ({...state, bufferRanges: getBufferRanges(elm)}))

  const controls = {
    play: () => elm.play(),
    pause: () => elm.pause(),
    togglePlay: () => (state.playing ? elm.pause() : elm.play()),
    setPosition: position => (elm.currentTime = elm.duration * position)
  }

  function subscribe (observer) {
    observers.push(observer)

    return {
      unsubscribe () {
        observers.splice(observers.indexOf(observer), 1)
      }
    }
  }

  function unmount () {
    elm.removeEventListener('play', handlePlay)
    elm.removeEventListener('pause', handlePause)
    elm.removeEventListener('timeupdate', handleTimeupdate)
    elm.removeEventListener('durationchange', handleDurationchange)
    elm.removeEventListener('progress', handleProgress)

    if (props.onClick) {
      elm.removeEventListener('click', props.onClick)
    }
  }

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
    subscribe,
    unmount
  }
}
