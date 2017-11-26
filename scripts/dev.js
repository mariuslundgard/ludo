'use strict'

const chokidar = require('chokidar')
const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../.webpack/development.config')

const sourcePath = path.resolve(__dirname, '../src')
const serverPath = path.resolve(__dirname, '../src/server')

require('babel-register')({
  only: sourcePath
})

const config = {
  manifest: {
    'app.css': 'app.css',
    'app.js': 'app.js'
  }
}

const port = 3000

// Setup server-side watcher
const watcher = chokidar.watch(sourcePath)
watcher.on('ready', () => {
  watcher.on('all', () => {
    Object.keys(require.cache)
      .filter(key => key.startsWith(sourcePath))
      .forEach(key => {
        delete require.cache[key]
      })
  })
})

// Setup HTTP server
const app = express()
app.use((req, res, next) => {
  require(serverPath).create(config)(req, res, next)
})

// Setup webpack middleware
const webpackCompiler = webpack(webpackConfig)
app.use(
  require('webpack-dev-middleware')(webpackCompiler, {
    hot: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
)
app.use(
  require('webpack-hot-middleware')(webpackCompiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  })
)

// Start HTTP server
app.listen(port, err => {
  if (err) {
    console.log(err)
    process.exit(1)
  } else {
    console.log(`Listening at http://localhost:${port}`)
  }
})
