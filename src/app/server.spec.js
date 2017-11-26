// @flow

import express from 'express'
import supertest from 'supertest'
import * as server from './server'

describe('app', () => {
  it('should respond with a rendered component', async () => {
    const app = express()

    app.use(
      server.create({
        manifest: {
          'app.js': 'app.js',
          'app.css': 'app.css'
        }
      })
    )

    const res = await supertest(app).get('/')

    expect(res.text).toContain('<title>prototype-ludo-state</title>')
    expect(res.text).toContain('<link rel="stylesheet" href="/app.css">')
    expect(res.text).toContain('<div class="prototype-ludo-state-app">')
    expect(res.text).toContain('<script src="/app.js"></script>')
  })
})
