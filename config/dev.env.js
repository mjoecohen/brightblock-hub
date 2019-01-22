'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_DEBUG_MODE: 'false',
  VUE_APP_BTC_GATEWAY_URL: '"https://api.brightblock.org"'
})
