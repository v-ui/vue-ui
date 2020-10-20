import { createPopper } from '@popperjs/core'

export default {
  base: {
    data () {
      return {
        popper: null,
        popRef: null,
        popEle: null,
        popOpts: { placement: 'bottom-start', },
      }
    },

    beforeDestroy() {
      if (!this.popper) return
      this.popper.destroy()
      this.popper = null
    },
    watch: {
      popRef: function() {
        this.plugin_initPopper()
      },
      popEle: function() {
        this.plugin_initPopper()
      }
    },
    methods: {
      plugin_initPopper: async function() {
        if (this.popRef && this.popEle) {
          await this.$nextTick()
          this.popper = await createPopper(this.popRef.$el || this.popRef, this.popEle.$el || this.popEle, this.popOpts)
        }
      },
    },
  },
}
