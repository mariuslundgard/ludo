// @flow

/** @jsx h */

import {Router} from 'express'
import layout from 'layout'
import {h} from 'preact'
import {render} from 'preact-render-to-string'
import Root from './Root'

import type {$Request, $Response} from 'express'
import type {Config} from '../types'

export function create (config: Config) {
  const router = Router()

  router.get('/', async (req: $Request, res: $Response) => {
    const props = {
      playlist: [
        {
          type: 'video',
          poster: 'http://dh-edge.nrk.no/videos/brennpunkt-fyrverkeri.1080p.mp4.jpg',
          sources: {
            mp4: 'http://dh-edge.nrk.no/videos/brennpunkt-fyrverkeri.1080p.mp4',
            webm: 'http://dh-edge.nrk.no/videos/brennpunkt-fyrverkeri.1080p.webm'
          }
        },
        {
          type: 'video',
          poster: 'http://dh-edge.nrk.no/videos/br-nmb-nordendagarna-1.1080p.mp4.jpg',
          sources: {
            mp4: 'http://dh-edge.nrk.no/videos/br-nmb-nordendagarna-1.1080p.mp4',
            webm: 'http://dh-edge.nrk.no/videos/br-nmb-nordendagarna-1.1080p.webm'
          }
        },
        {
          type: 'video',
          poster: 'https://pmd-nrk.akamaized.net/urix/korrebrev-syria/rev1/03_standup_med_fade-720p.mp4.jpg',
          sources: {
            mp4: 'https://pmd-nrk.akamaized.net/urix/korrebrev-syria/rev1/03_standup_med_fade-720p.mp4',
            webm: 'https://pmd-nrk.akamaized.net/urix/korrebrev-syria/rev1/03_standup_med_fade-720p.webm'
          }
        }
      ],
      playlistIndex: 0
    }

    res.send(
      layout({
        title: 'prototype-ludo-state',
        head: `<link rel="stylesheet" href="/${config.manifest['app.css']}">`,
        body: [
          `<div id="root">${render(<Root {...props} />)}</div>`,
          `<script>var __PROPS__ = ${JSON.stringify(props)}</script>`,
          `<script src="/${config.manifest['app.js']}"></script>`
        ].join('')
      })
    )
  })

  return router
}
