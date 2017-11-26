// @flow

import type {Observable} from './types'

export function combineLatest (f: Function, ...sources: Observable<any>[]): Observable<any> {
  return {
    subscribe (observer) {
      const len = sources.length
      const values = Array.from(Array(len))
      const idxs = []
      const subscriptions = sources.map((source, idx) => {
        return source.subscribe({
          next: value => {
            values[idx] = value
            if (idxs.indexOf(idx) === -1) idxs.push(idx)
            if (idxs.length === len) {
              observer.next(f(...values))
            }
          }
        })
      })

      return {
        unsubscribe () {
          subscriptions.forEach(subscription => subscription.unsubscribe())
        }
      }
    }
  }
}

export function map (f: Function, source: Observable<any>): Observable<any> {
  return {
    subscribe (observer) {
      return source.subscribe({
        next: value => observer.next(f(value)),
        error: observer.error,
        complete: observer.complete
      })
    }
  }
}

export function merge (...sources: Observable<any>[]): Observable<any> {
  return {
    subscribe (observer) {
      const subscriptions = sources.map(source =>
        source.subscribe({
          next: value => observer.next(value)
        })
      )

      return {
        unsubscribe () {
          subscriptions.forEach(subscription => subscription.unsubscribe())
        }
      }
    }
  }
}

export function startWith (value: any, source: Observable<any>): Observable<any> {
  return {
    subscribe (observer) {
      observer.next(value)
      return source.subscribe(observer)
    }
  }
}
