/**
 * chroma.js
 * https://vis4.net/chromajs/
 * Github
 * https://github.com/gka/chroma.js/
 */

import chroma from 'chroma-js'

export default {
  base: {
    data() {
      return {
        color: chroma,
      }
    },
    destroyed() {
      this.chroma = null
    },
  },
}
