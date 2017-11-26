'use strict'

const postcssCssVariables = require('postcss-css-variables')
const autoprefixer = require('autoprefixer')
const postCssNested = require('postcss-nested')

module.exports = {
  plugins: [postCssNested, postcssCssVariables, autoprefixer]
}
