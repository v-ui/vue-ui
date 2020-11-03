/**
 * ClipboardJS
 * https://clipboardjs.com/
 * Github
 * https://github.com/zenorocha/clipboard.js
 */

import ClipboardJS from 'clipboard'

export default {
  base: {
    data () {
      return {
        clipboard: null,
        clipElement: null,
        clipOption: {},
      }
    },
    created () {
      if (!this.clipElement) return
      this.clipboard = new ClipboardJS(this.clipElement, this.clipOption)
    },
    destroyed() {
      if (!this.clipboard || !this.clipboard.destroy) return
      this.clipboard.destroy()
      this.clipboard = null
    }
  },
}
