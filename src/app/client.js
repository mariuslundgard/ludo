// @flow

/** @jsx h */

import {h, render} from 'preact'
import Root from './Root'
import './index.css'

declare var __PROPS__: any

const rootElm: any = document.getElementById('root')

render(<Root {...__PROPS__} />, rootElm, rootElm.firstChild)
