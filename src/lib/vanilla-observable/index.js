// @flow

import type {Observable} from './types'

export function fromEvent (elm: HTMLElement, eventType: string): Observable<Event> {
  return {
    subscribe (observer) {
      function eventHandler (evt) {
        observer.next(evt)
      }

      elm.addEventListener(eventType, eventHandler)

      return {
        unsubscribe () {
          elm.removeEventListener(eventType, eventHandler)
          if (observer.complete) observer.complete()
        }
      }
    }
  }
}
