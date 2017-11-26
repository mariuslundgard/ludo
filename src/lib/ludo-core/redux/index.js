// @flow

import {createStore} from 'redux'
import {getBufferRanges} from '../utils'

import type {BrowserContext, Props} from '../types'

export function mount (elm: any, props: Props): BrowserContext {
  const observers = []

  const store = createStore(
    (state, msg) => {
      switch (msg.type) {
        case 'PLAY':
          return {...state, playing: true}
        case 'PAUSE':
          return {...state, playing: false}
        case 'TIMEUPDATE':
          return {...state, time: msg.time}
        case 'DURATIONCHANGE':
          return {...state, duration: msg.duration}
        case 'PROGRESS':
          return {...state, bufferRanges: msg.bufferRanges}
        default:
          return state
      }
    },
    {
      playing: false,
      time: elm.currentTime || 0,
      duration: elm.duration || 0,
      bufferRanges: getBufferRanges(elm)
    }
  )

  const controls = {
    play: () => elm.play(),
    pause: () => elm.pause(),
    togglePlay: () => (store.getState().playing ? elm.pause() : elm.play()),
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

  const handlePlay = () => store.dispatch({type: 'PLAY'})
  const handlePause = () => store.dispatch({type: 'PAUSE'})
  const handleTimeupdate = () => store.dispatch({type: 'TIMEUPDATE', time: elm.currentTime})
  const handleDurationchange = () => store.dispatch({type: 'DURATIONCHANGE', duration: elm.duration})
  const handleProgress = () => store.dispatch({type: 'PROGRESS', bufferRanges: getBufferRanges(elm)})

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

  store.subscribe(() => {
    observers.forEach(observer => observer.next(store.getState()))
  })

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
