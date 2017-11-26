// @flow

import {Observable} from 'rxjs'
import {getBufferRanges} from '../utils'

import type {BrowserContext, Props, State} from '../types'

export function mount (elm: any, props: Props): BrowserContext {
  let state: State

  const observers = []

  const play$ = Observable.fromEvent(elm, 'play').map(() => true)
  const pause$ = Observable.fromEvent(elm, 'pause').map(() => false)
  const playing$ = Observable.merge(play$, pause$).startWith(props.autoPlay)
  const duration$ = Observable.fromEvent(elm, 'durationchange')
    .map(() => elm.duration)
    .startWith(elm.duration || 0)
  const time$ = Observable.fromEvent(elm, 'timeupdate')
    .map(() => elm.currentTime)
    .startWith(elm.currentTime)
  const bufferRanges$ = Observable.fromEvent(elm, 'progress')
    .map(() => getBufferRanges(elm))
    .startWith(getBufferRanges(elm))

  const state$ = Observable.combineLatest(
    playing$,
    duration$,
    time$,
    bufferRanges$,
    (playing, duration, time, bufferRanges) => ({
      playing,
      duration,
      time,
      bufferRanges
    })
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
