// @flow

import {Component} from 'preact'
import {mount, render} from 'ludo-core'

import type {BrowserContext, Controls} from 'ludo-core/types'

class Video extends Component<any> {
  context: BrowserContext
  controls: Controls
  elm: HTMLVideoElement
  subscribe: Function

  componentDidMount () {
    this.context = mount(this.elm, this.props)
    this.controls = this.context.controls
    this.subscribe = this.context.subscribe
  }

  componentWillUnmount () {
    this.context.unmount()
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return render({...this.props, ref: elm => (this.elm = elm)})
  }
}

export default Video
