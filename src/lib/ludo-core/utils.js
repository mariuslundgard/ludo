// @flow

import type {BufferRange} from './types'

export function getBufferRanges (elm: HTMLVideoElement): BufferRange[] {
  const ranges = []

  for (let i = 0; i < elm.buffered.length; i += 1) {
    ranges.push({
      start: elm.buffered.start(i),
      end: elm.buffered.end(i)
    })
  }

  return ranges
}
