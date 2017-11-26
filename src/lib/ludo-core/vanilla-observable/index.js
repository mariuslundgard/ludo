// @flow

import {fromEvent} from 'vanilla-observable'
import {combineLatest, map, merge, startWith} from 'vanilla-observable/operators'
import {getBufferRanges} from '../utils'

import type {BrowserContext, Props, State} from '../types'

export function mount (elm: any, props: Props): BrowserContext {
  let state: State

  const observers = []

  const play$ = map(() => true, fromEvent(elm, 'play'))
  const pause$ = map(() => false, fromEvent(elm, 'pause'))
  const playing$ = startWith(false, merge(play$, pause$))
  const duration$ = startWith(elm.duration, map(() => elm.duration, fromEvent(elm, 'durationchange')))
  const time$ = startWith(elm.currentTime, map(() => elm.currentTime, fromEvent(elm, 'timeupdate')))
  const bufferRanges$ = startWith(getBufferRanges(elm), map(() => getBufferRanges(elm), fromEvent(elm, 'progress')))

  const state$ = combineLatest(
    (playing, duration, time, bufferRanges) => ({
      playing,
      duration,
      time,
      bufferRanges
    }),
    playing$,
    duration$,
    time$,
    bufferRanges$
  )

  const stateSubscription = state$.subscribe({
    next: newState => {
      state = newState
      observers.forEach(observer => observer.next(state))
    }
  })

  function subscribe (observer) {
    observers.push(observer)
  }

  function unmount () {
    stateSubscription.unsubscribe()

    if (props.onClick) {
      elm.removeEventListener('click', props.onClick)
    }
  }

  const controls = {
    play: () => elm.play(),
    pause: () => elm.pause(),
    togglePlay: () => (state.playing ? elm.pause() : elm.play()),
    setPosition: position => (elm.currentTime = elm.duration * position)
  }

  if (props.onClick) {
    elm.addEventListener('click', props.onClick)
  }

  return {
    subscribe,
    unmount,
    controls
  }
}
