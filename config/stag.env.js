'use strict'
const abi = require('./abi/ArtMarket')
console.log(abi)

module.exports = {
  NODE_ENV: '"staging"',
  VUE_APP_DEBUG_MODE: 'false',
  VUE_APP_TOK_BOX_API_KEY: '46171452',
  VUE_APP_SHAPE_SHIFT_URL: '"https://cors.shapeshift.io"',
  VUE_APP_ETH_GATEWAY_URL: '"https://staging-api.transit8.com"',
  VUE_APP_BTC_GATEWAY_URL: '"https://api.brightblock.org"',
  VUE_APP_SEARCH_INDEX_URL: '"https://search.brightblock.org"',
  VUE_APP_ETHEREUM_NETWORK: '"Rinkby (4)"',
  VUE_APP_ETHEREUM_ABI: '\'' + JSON.stringify(abi) + '\'',
}
