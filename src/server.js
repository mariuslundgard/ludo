// @flow

import express from 'express'
import * as app from './app/server'

import type {Config} from './types'

export function create (config: Config) {
  const server = express()

  server.use('/', app.create(config))

  return server
}
