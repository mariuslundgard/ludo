// @flow

export type BufferRange = {
  start: number,
  end: number
}

export type Props = {
  autoPlay?: boolean,
  muted?: boolean,
  poster: string,
  sources: {
    mp4: string,
    webm: string
  },
  ref?: Function
}

export type State = {
  playing: boolean,
  duration: number,
  time: number,
  bufferRanges: BufferRange[]
}

export type Controls = {
  play: () => void,
  pause: () => void,
  togglePlay: () => void,
  setPosition: (position: number) => number
}

export type BrowserContext = {
  controls: Controls,
  subscribe: Function,
  unmount: Function
}
