// @flow

export type Subscription = {
  unsubscribe: () => void
}

export type Observer<T> = {
  next: (value: T) => void,
  error?: (error: Error) => void,
  complete?: () => void
}

export type Observable<T> = {
  subscribe: (observer: Observer<T>) => Subscription
}
